import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { AffectationTacheService } from "../affectation-tache/affectation-tache.service";
import { TacheService } from "../tache.service";

@Component({
  selector: "app-tache-show",
  templateUrl: "./tache-show.component.html",
  styleUrls: ["./tache-show.component.scss"],
})
export class TacheShowComponent extends BaseSingleComponent implements OnInit {
  afficherDetailsUniquement: boolean = false;
  constructor(
    public affectationTacheService: AffectationTacheService,
    public route: ActivatedRoute,
    public tacheService: TacheService,
    public router: Router
  ) {
    super(affectationTacheService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.getTache(params["id"]);
      }
    });

    this.afficherDetailsUniquement = this.router.url.includes("mes-taches");
  }

  getTache(affectation_tache: number) {
    this.loading = true;
    this.affectationTacheService
      .getSingle(affectation_tache)
      .subscribe((affectation) => {
        this.tacheService.singleData = affectation.tache_details;
        this.loading = false;
      });
  }
}
