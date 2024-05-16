import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { SideBarComponent } from '../../shared/component/side-bar/side-bar.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HomePagesComponent,
    
  ],
  imports: [
    //siempre se importa el modulo completo
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
