import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { ConsulatService } from "../../consulat/consulat.service";
import { MinistereService } from "../../ministere/ministere.service";
import { PaysService } from "../../pays/pays.service";
import { LiaisonCreateComponent } from "../liaison-create/liaison-create.component";
import { LiaisonService } from "../liaison.service";

@Component({
  selector: "app-liaison-edit",
  templateUrl: "./liaison-edit.component.html",
  styleUrls: ["./liaison-edit.component.scss"],
})
export class LiaisonEditComponent
  extends LiaisonCreateComponent
  implements OnInit
{
  liaison: any;

  constructor(
    public liaisonService: LiaisonService,
    public ministereService: MinistereService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService
  ) {
    super(
      liaisonService,
      paysService,
      router,
      route,
      ambassadeService,
      consulatService
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["liaison"] = this.liaisonService.singleData$.subscribe(
      (liaison) => {
        this.liaison = liaison;
        this.initialiseForm(liaison);
        this.addControls(
          ["ambassade", "bureau"],
          [[liaison.ambassades[0]], [liaison.bureau]],
          [true, true]
        );
      }
    );
  }

  update(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays_siege: this.formValue("pays_siege")[0].id,
        ambassade: this.formValue("ambassade")[0].id,
        bureau: this.formValue("bureau")[0].id,
        // ministere: this.parent.name === "ministere" ? this.parent.item.id : null,
      };

      this.service.update(this.liaison.id, data).subscribe(() => {
        this.loading = false;
        this.helper.toggleModal(`liaison-edit-modal`);
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
