// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/signin-v2',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then((module) => module.DashboardModule)
      },
      {
        path: 'parametre',
        loadChildren: () => import('./parametre/parametre.module').then((module) => module.ParametreModule)
      },
      {
        path: 'administrative',
        loadChildren: () => import('./administrative/administrative.module').then((module) => module.AdministrativeModule)
      },
     
     
      {
        path: 'acceuil',
        loadChildren: () => import('./accueil/acceuil.module').then((module) => module.AcceuilModule)
      },
      

      {
        path: 'maintenance',
        loadChildren: () => import('./demo/pages/maintenance/maintenance.module').then((module) => module.MaintenanceModule)
      }
      ,
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((module) => module.AuthenticationModule)
      },
      {
        path: 'transitaire',
        loadChildren: () => import('./transitaire/transitaire.module').then((module) => module.TransitaireModule)
      },
      {
        path: 'example',
        loadChildren: () => import('./example/example/example.module').then((module) => module.ExampleModule)
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
