import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritePagesComponent } from './pages/favorite-pages/favorite-pages.component';

const routes: Routes = [
//cuando entramos entramos a la ruta de favorites estamos haciendo que sea renderizado desde el routerOulet de home 
  {path:'',
  component:FavoritePagesComponent,
  //declaramos el router-outlet
  outlet:'home'
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
