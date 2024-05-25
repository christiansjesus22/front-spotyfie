import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//modulo toast
import { NgToastModule } from 'ng-angular-popup'
//importando proveedor de tokens/cookies
import { CookieService } from 'ngx-cookie-service';
import {  injecctSessionInterceptor } from './core/interceptors/inject-session.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     //importamos el http cliente
     HttpClientModule,
     //imortando libreria de tarjetas de alerta
     NgToastModule

  ],

  providers: [
    CookieService,
    {
      provide:HTTP_INTERCEPTORS,
      //importando interceptores
      useClass:injecctSessionInterceptor,
      //configuracion para habilitar el uso de multiples interceptores
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
