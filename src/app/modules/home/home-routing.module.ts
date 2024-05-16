import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';

const routes: Routes = [
  //generamos la navegacion interna dentro del modulo de home, haciendo uso de su propio router-oulet
  {
    path:'tracks', 
    loadChildren:()=> import('../tracks/tracks.module').then(m=>m.TracksModule)
  },
  {
    path:'favorites', 
    loadChildren:()=> import('../favorites/favorites.module').then(m=>m.FavoritesModule)
  },
  {
    path:'history', 
    loadChildren:()=> import('../history/history.module').then(m=>m.HistoryModule)
  },  
  {
    path:'upload', 
    loadChildren:()=> import('../upload/upload.module').then(m=>m.UploadModule)
  },
  {
    path:'mySongs', 
    loadChildren:()=> import('../my-songs/my-songs.module').then(m=>m.MySongsModule)
  },
  {
    path:'', 
    loadChildren:()=> import('../tracks/tracks.module').then(m=>m.TracksModule)  },   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
