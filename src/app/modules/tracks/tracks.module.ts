import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TrackPagesComponent } from './pages/track-pages/track-pages.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    TrackPagesComponent
  ],
  imports: [
    CommonModule,
    TracksRoutingModule,
    SharedModule,
   
  ]
})
export class TracksModule { }
