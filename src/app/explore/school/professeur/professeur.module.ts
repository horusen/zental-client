import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfesseurComponent } from "./professeur.component";
import { SharedModule } from "src/app/shared/shared.module";
import { Routes } from "@angular/router";
import { ProfesseurListByClasseComponent } from './professeur-list-by-classe/professeur-list-by-classe.component';
import { ProfesseurListByEtablissementComponent } from './professeur-list-by-etablissement/professeur-list-by-etablissement.component';
import { ProfesseurListHorsEtablissementComponent } from './professeur-list-hors-etablissement/professeur-list-hors-etablissement.component';
import { ProfesseurListComponent } from './professeur-list/professeur-list.component';

const routes: Routes = [
  {
    path: "",
    component: ProfesseurComponent,
  },
];

@NgModule({
  declarations: [ProfesseurComponent, ProfesseurListByClasseComponent, ProfesseurListByEtablissementComponent, ProfesseurListHorsEtablissementComponent, ProfesseurListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesseurModule {}