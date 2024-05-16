import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPagesComponent } from './pages/auth-pages/auth-pages.component';
import { RegisterPagesComponent } from './pages/register-pages/register-pages.component';

const routes: Routes = [
{
  path:'',
  component: AuthPagesComponent
},
{
  path:'login',
  component: AuthPagesComponent
},

{
  path:'register',
  component:RegisterPagesComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
