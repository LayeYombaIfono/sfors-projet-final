// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import TableauBord1Component from './tableau-bord1/tableau-bord1.component';


const routes: Routes = [
      {
        path: 'tableauBord',
        component: TableauBord1Component
      }
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceuilRoutingModule {}
