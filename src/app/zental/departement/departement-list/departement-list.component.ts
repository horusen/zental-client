import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { MinistereService } from "../../ministere/ministere.service";
import { DepartementService } from "../departement.service";

@Component({
  selector: "app-departement-list",
  templateUrl: "./departement-list.component.html",
  styleUrls: ["./departement-list.component.scss"],
})
export class DepartementListComponent extends BaseComponent implements OnInit {
  constructor(
    public departementService: DepartementService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(departementService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (this.router.url.includes("ministere")) {
        this._subscription["ministere"] =
          this.ministereService.singleData$.subscribe((ministere) => {
            this.getByMinistere(ministere.id, params);
          });
        console.log("ministere");
      } else if (this.router.url.includes("ambassade")) {
        this._subscription["ambassade"] =
          this.ambassadeService.singleData$.subscribe((ambassade) => {
            this.getByAmbassade(ambassade.id, params);
          });
      }
    });
  }

  getByMinistere(ministere: number, params: Params) {
    this.loading = true;
    this.departementService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByAmbassade(ambassade: number, params: Params) {
    this.loading = true;
    this.departementService.getByAmbassade(ambassade, params).subscribe(() => {
      this.loading = false;
    });
  }
}