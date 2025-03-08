import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import TableauBord1Component from './tableau-bord1/tableau-bord1.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from '../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { AcceuilRoutingModule } from './acceuil-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    TableauBord1Component
  ],
  imports: [
    CommonModule,
    AcceuilRoutingModule,
    NgbDropdownModule, 
    ColorPickerModule, 
    SharedModule,
    DataTablesModule,
    NgApexchartsModule
  ]
})
export class AcceuilModule { }
