import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilMinistereComponent } from "./profil-ministere.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AdresseModule } from "../../adresse/adresse.module";
import { MinistereDetailsComponent } from "./ministere-details/ministere-details.component";
import { ComposantDescriptionModule } from "../../composant-description/composant-description.module";
import { DescriptionPartielMinistereComponent } from "./description-partiel-ministere/description-partiel-ministere.component";
import { MinistreShowMinComponent } from "./ministre-show-min/ministre-show-min.component";
import { InstitutionModule } from "../../institution/institution.module";

const routes: Routes = [
  {
    path: "",
    component: ProfilMinistereComponent,
    children: [
      {
        path: "",
        component: MinistereDetailsComponent,
      },
      {
        path: "ministres",
        loadChildren: () =>
          import("./../../ministre/ministre.module").then(
            (module) => module.MinistreModule
          ),
      },
      {
        path: "missions",
        component: DescriptionPartielMinistereComponent,
      },
      {
        path: "organisations",
        component: DescriptionPartielMinistereComponent,
      },
      {
        path: "services",
        loadChildren: () =>
          import("./../ministere-service/ministere-service.module").then(
            (module) => module.MinistereServiceModule
          ),
      },
      {
        path: "ici-mon-pays",
        loadChildren: () =>
          import("./../../ici-mon-pays/ici-mon-pays.module").then(
            (module) => module.IciMonPaysModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [
    ProfilMinistereComponent,
    MinistereDetailsComponent,
    DescriptionPartielMinistereComponent,
    MinistreShowMinComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AdresseModule,
    ComposantDescriptionModule,
    InstitutionModule,
  ],
  exports: [RouterModule],
})
export class ProfilMinistereModule {}
