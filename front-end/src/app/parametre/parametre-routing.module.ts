import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateurListComponent } from './utilisateur/utilisateur-list/utilisateur-list.component';


const routes: Routes = [
  {
    path: "utilisateurs",
    component: UtilisateurListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametreRoutingModule { }
