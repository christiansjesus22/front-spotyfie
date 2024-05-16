import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPagesComponent } from './pages/auth-pages/auth-pages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPagesComponent } from './pages/register-pages/register-pages.component';


@NgModule({
  declarations: [
    AuthPagesComponent,
    RegisterPagesComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
