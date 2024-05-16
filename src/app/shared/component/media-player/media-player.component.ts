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

  constructor(private multimediaService:MultimediaService){}

  ngOnInit(): void {
    const observer01: Subscription = this.multimediaService.callBack.subscribe(
      ( response:tracksModel)=>{
        console.log('recibiendo track desde el media player', response)
      }
    )

    //lista de observers para limpiar el cache de memoria de los subscribes
    this.listObserers  = [observer01]
  }

  ngOnDestroy(): void {
    
    this.listObserers.forEach(u=> u.unsubscribe())
  }

}
