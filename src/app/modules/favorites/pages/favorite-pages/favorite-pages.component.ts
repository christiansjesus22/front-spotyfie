import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackService } from '../../../../shared/services/track.service';
import { tracksModel } from '../../../../core/models/tracks.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite-pages',
  templateUrl: './favorite-pages.component.html',
  styleUrl: './favorite-pages.component.css'
})
export class FavoritePagesComponent  implements OnInit, OnDestroy {

  constructor(private trackService: TrackService) {}

 //llamamos al modelo de canciones 
 tracks: Array<tracksModel> = []
 //lista de observables
 listObservers$: Array<Subscription> = []
 //variable numero de canciones agregadas
 tracksLength: number = 0 



 loadData(): void {
  this.trackService.getAllTracks$().subscribe((response: tracksModel[]) => {

    //definiendo listas de canciones
    this.tracks = response
    
    console.log("capturando canciones desde el componente ",response)
    this.tracksLength = response.length
    
    //cuando finaliza el subcribe se puede adicionar un capturador de errores
  }, err =>{ console.log ( "ocurrio un error al cargar las canciones", err)})
}



 ngOnInit(): void {
  //funciones que se ejecutan al iniciar el modulo    
  this.loadData()
    }


    ngOnDestroy(): void {

    }

}
