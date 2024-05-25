import { Component, OnDestroy, OnInit } from '@angular/core';
import { tracksModel } from '../../../core/models/tracks.model';
import { MultimediaService } from '../../services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent implements OnInit,OnDestroy {
  
   listObserers:Array<Subscription> =[]
   state:string = "paused"

  constructor(public multimediaService:MultimediaService){}

  ngOnInit(): void {

    const observer01$= this.multimediaService.status$.subscribe( res=>{
      console.log ("estado de la cancion",res)
      this.state = res
    })

    const observer02$ = this.multimediaService.trackInfo$.subscribe(res =>{
    })

    //lista de observers para limpiar el cache de memoria de los subscribes
    this.listObserers  = [observer01$, observer02$]
  }

  ngOnDestroy(): void {
    
    this.listObserers.forEach(u=> u.unsubscribe())
  }

}
