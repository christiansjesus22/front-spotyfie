import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackPagesComponent } from './pages/track-pages/track-pages.component';

const routes: Routes = [
  //cuando entramos entramos a la ruta de tracks estamos haciendo que sea renderizado desde el routerOulet de home 
  {path:'',
    component:TrackPagesComponent,
    outlet:'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracksRoutingModule { }
