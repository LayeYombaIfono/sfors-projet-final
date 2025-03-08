import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransitaireRoutingModule } from './transitaire-routing.module';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from '../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { PageAcueilComponent } from './page-acueil/page-acueil.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { FormationComponent } from './formation/formation.component';
import { FormInscriptionComponent } from './form-inscription/form-inscription.component';

@NgModule({
  declarations: [
   
    ClientListComponent,
    ClientFormComponent,
    PageAcueilComponent,
    NavBarComponent,
    FooterComponent,
    FormationComponent,
    FormInscriptionComponent,
  ],
  imports: [
    CommonModule,
    TransitaireRoutingModule,
    NgbModule,
    NgbDropdownModule, 
    ColorPickerModule, 
    SharedModule,
  
  ]
})
export class TransitaireModule { }
