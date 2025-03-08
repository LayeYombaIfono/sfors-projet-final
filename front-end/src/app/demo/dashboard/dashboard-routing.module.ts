// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'analytics',
        loadComponent: () => import('./dash-analytics/dash-analytics.component')
      },
      {
        path: 'sale',
        loadComponent: () => import('./dash-sale/dash-sale.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
