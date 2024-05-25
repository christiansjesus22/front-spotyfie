import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './modules/home/pages/home-pages/home-pages.component';
import { sessionGuard } from './core/guards/session.guard';

const routes: Routes = [
  // se utiliza 2 modulos principales para resolver el problema del media player 
{
  //implementando guard para protejer la ruta 
  path: '',  canActivate:[sessionGuard], 
  
  component:HomePagesComponent,
  //cargamos el modulo home que tendra una subnavegacion interna con su propio routeroulet
  loadChildren:() => import('./modules/home/home.module').then(m=>m.HomeModule),
},
{
  path: 'auth', //cargamos modulo autentificacion
  loadChildren:() => import('./modules/auth/auth.module').then(m=>m.AuthModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
