import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';


import { AdministrativeRoutingModule } from './administrative-routing.module';

import { NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from '../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { WebcamModule } from 'ngx-webcam';
import { FormateurFormComponent } from './formateur-form/formateur-form.component';
import { FormateurListComponent } from './formateur-list/formateur-list.component';
import { FormationFormComponent } from './formation-form/formation-form.component';
import { FormationListComponent } from './formation-list/formation-list.component';
import { AffectationListComponent } from './affectation-list/affectation-list.component';
import { AffectationFormComponent } from './affectation-form/affectation-form.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { InscriptionListComponent } from './inscription-list/inscription-list.component';
import { InscriptionFormComponent } from './inscription-form/inscription-form.component';




@NgModule({
  declarations: [
          FormateurFormComponent,
          FormateurListComponent,
          AffectationListComponent,
          AffectationFormComponent,
          FormationFormComponent,
          FormationListComponent,
          PublicationListComponent,
          PublicationFormComponent,
          FormateurFormComponent,
          FormateurListComponent,
          FormationFormComponent,
          FormationListComponent,
          AffectationListComponent,
          AffectationFormComponent,
          PublicationFormComponent,
          PublicationListComponent,
          InscriptionListComponent,
          InscriptionFormComponent
  ],
  imports: [
    CommonModule,
    AdministrativeRoutingModule,
    NgbModule,
    NgbDropdownModule, 
    ColorPickerModule, 
    SharedModule,
    DataTablesModule,
    NgbAccordionModule,
    WebcamModule,
    NgbAccordionModule,
    
  ]
})
export class AdministrativeModule { }
