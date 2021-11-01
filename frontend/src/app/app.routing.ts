import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login/login-page.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { MultiFactorAuthenticationComponent } from './mfa/mfa.component';
import { IsLoggedInGuard } from './is-logged-in-guard';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'mfa',
    canActivate: [IsAuthenticatedGuard], 
    component: MultiFactorAuthenticationComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [IsAuthenticatedGuard],
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
