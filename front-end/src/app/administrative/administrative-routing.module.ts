import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormateurListComponent } from './formateur-list/formateur-list.component';
import { FormationListComponent } from './formation-list/formation-list.component';
import { AffectationListComponent } from './affectation-list/affectation-list.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { InscriptionListComponent } from './inscription-list/inscription-list.component';

const routes: Routes = [
  {
    path: "formateur", 
    
     component: FormateurListComponent,
   },
   {
    path: "affectation", 
    
     component: AffectationListComponent,
   },
   {
    path: "formation", 
    
     component: FormationListComponent,
   },
   {
    path: "publication", 
    
     component: PublicationListComponent,
   },
   {
    path: "inscription", 
    
     component: InscriptionListComponent,
   },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativeRoutingModule { }
