import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    UploadPageComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    ReactiveFormsModule,
    SharedModule
    
  ]
})
export class UploadModule { }
