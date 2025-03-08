import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametreRoutingModule } from './parametre-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from '../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UtilisateurFormComponent } from './utilisateur/utilisateur-form/utilisateur-form.component';
import { UtilisateurListComponent } from './utilisateur/utilisateur-list/utilisateur-list.component';

@NgModule({
  declarations: [
    UtilisateurFormComponent,
    UtilisateurListComponent,
  ],
  imports: [
    CommonModule,
    ParametreRoutingModule,
    NgbDropdownModule, 
    ColorPickerModule, 
    SharedModule,
    DataTablesModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class ParametreModule { }
