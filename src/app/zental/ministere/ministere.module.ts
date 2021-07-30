import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinistereComponent } from "./ministere.component";
import { MinistereListComponent } from "./ministere-list/ministere-list.component";
import { MinistereShowComponent } from "./ministere-show/ministere-show.component";
import { MinistereCreateComponent } from "./ministere-create/ministere-create.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { MinistereMissingDataComponent } from "./ministere-missing-data/ministere-missing-data.component";

const routes: Routes = [
  {
    path: "",
    component: MinistereComponent,
    children: [
      {
        path: "",
        component: MinistereListComponent,
      },
      {
        path: ":id",
        component: MinistereShowComponent,
        children: [
          {
            path: "profil",
            loadChildren: () =>
              import("./profil-ministere/profil-ministere.module").then(
                (module) => module.ProfilMinistereModule
              ),
          },
          {
            path: "admin",
            loadChildren: () =>
              import(
                "./../administration-ministere/administration-ministere.module"
              ).then((module) => module.AdministrationMinistereModule),
          },
          {
            path: "**",
            redirectTo: "profil",
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    MinistereComponent,
    MinistereListComponent,
    MinistereShowComponent,
    MinistereCreateComponent,
    MinistereMissingDataComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinistereModule {}