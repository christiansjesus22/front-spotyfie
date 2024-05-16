import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MySongsRoutingModule } from './my-songs-routing.module';
import { MySongsPageComponent } from './pages/my-songs-page/my-songs-page.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MySongsPageComponent
  ],
  imports: [
    CommonModule,
    MySongsRoutingModule,
    SharedModule
  ]
})
export class MySongsModule { }
