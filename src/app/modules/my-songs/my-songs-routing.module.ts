import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySongsPageComponent } from './pages/my-songs-page/my-songs-page.component';

const routes: Routes = [
 //cuando entramos entramos a la ruta de tracks estamos haciendo que sea renderizado desde el routerOulet de home 
 {path:'',
 component:MySongsPageComponent,
 outlet:'home'
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySongsRoutingModule { }
