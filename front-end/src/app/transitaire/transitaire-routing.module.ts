import {  RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { ClientListComponent } from "./client-list/client-list.component";
import { PageAcueilComponent } from "./page-acueil/page-acueil.component";
import { FormationComponent } from "./formation/formation.component";
import { FormInscriptionComponent } from "./form-inscription/form-inscription.component";

const routes: Routes = [
{
    path : "page-accueil",
    component : PageAcueilComponent,

},

{
    path : "client",
    component : ClientListComponent,

},

{
    path: "formations", component : FormationComponent
},

{
    path : "inscriptions/:uuid_publictation", component : FormInscriptionComponent
}


];

@NgModule({
imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransitaireRoutingModule{}
