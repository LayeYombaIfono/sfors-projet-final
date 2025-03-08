// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signup',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'signup-v2',
        loadComponent: () => import('./auth-signup-v2/auth-signup-v2.component')
      },
      {
        path: 'signin',
        loadComponent: () => import('./auth-signin/auth-signin.component')
      },
      {
        path: 'signin-v2',
        loadComponent: () => import('./auth-signin-v2/auth-signin-v2.component')
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./auth-reset-password/auth-reset-password.component')
      },
      {
        path: 'reset-password-v2',
        loadComponent: () => import('./auth-reset-password-v2/auth-reset-password-v2.component')
      },
      {
        path: 'change-password',
        loadComponent: () => import('./auth-change-password/auth-change-password.component')
      },
      {
        path: 'change-password-v2',
        loadComponent: () => import('./auth-change-password-v2/auth-change-password-v2.component')
      },
      {
        path: 'personal-information',
        loadComponent: () => import('./auth-personal-info/auth-personal-info.component')
      },
      {
        path: 'profile-settings',
        loadComponent: () => import('./auth-profile-settings/auth-profile-settings.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
