import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryPagesComponent } from './pages/history-pages/history-pages.component';

const routes: Routes = [
  //cuando entramos entramos a la ruta de history estamos haciendo que sea renderizado desde el routerOulet de home 
  {path:'',
    component:HistoryPagesComponent,
    outlet:'home'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
