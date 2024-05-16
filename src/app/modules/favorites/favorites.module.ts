import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritePagesComponent } from './pages/favorite-pages/favorite-pages.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    FavoritePagesComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule
    
  ]
})
export class FavoritesModule { }
