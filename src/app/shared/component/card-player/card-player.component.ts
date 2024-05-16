import { Component, OnInit,Input } from '@angular/core';
import { tracksModel } from '../../../core/models/tracks.model';
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrl: './card-player.component.css'
})
export class CardPlayerComponent implements OnInit {
  
  @Input() mode: 'small'  | 'big' = 'small'
  @Input() track!:tracksModel
  
constructor(private multimediaService:MultimediaService ){}
  
ngOnInit( ): void {}

//funcion capturar track seleccionado 
sendToPlay(track:tracksModel):void{
this.multimediaService.callBack.emit(track)
}

}
