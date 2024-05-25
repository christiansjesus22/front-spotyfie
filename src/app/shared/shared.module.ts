import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { MediaPlayerComponent } from './component/media-player/media-player.component';
import { HeaderUserComponent } from './component/header-user/header-user.component';
import { CardPlayerComponent } from './component/card-player/card-player.component';
import { GenericSectionComponent } from './component/generic-section/generic-section.component';
import { PlayListHeaderComponent } from './component/play-list-header/play-list-header.component';
import { PlayListBodyComponent } from './component/play-list-body/play-list-body.component';
import { RouterModule } from '@angular/router';
import { OrderListPipe } from './pipe/order-list.pipe';
import { ImgBrokenDirective } from './directives/img-broken.directive';
import { ProfileUserComponent } from './component/profile-user/profile-user.component';



@NgModule({
  declarations: [  
    //components
    SideBarComponent,
    MediaPlayerComponent,
    HeaderUserComponent,
    CardPlayerComponent,
    GenericSectionComponent,
    PlayListHeaderComponent,
    PlayListBodyComponent,
    ProfileUserComponent,

    //pipes
    OrderListPipe,

    //directives
    ImgBrokenDirective,
  ],
  imports: [
    CommonModule,
    
    //modulo de router
    RouterModule
  ],
  exports:[
    //components
    SideBarComponent,
    MediaPlayerComponent,
    HeaderUserComponent,
    CardPlayerComponent,
    GenericSectionComponent,
    PlayListHeaderComponent,
    PlayListBodyComponent,
    ProfileUserComponent,
    
    //pipes
    OrderListPipe,
    
    //directives
    ImgBrokenDirective
  ]
})
export class SharedModule { }
