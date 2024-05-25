import { Component, EventEmitter, OnDestroy, OnInit, Output, output } from '@angular/core';
import { TrackService } from '../../../../shared/services/track.service';
import { tracksModel } from '../../../../core/models/tracks.model';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-history-pages',
  templateUrl: './history-pages.component.html',
  styleUrl: './history-pages.component.css'
})
export class HistoryPagesComponent implements OnInit, OnDestroy  {

    
    tracks:Observable<any> = of([])
    //lista de observables
    listObservers$: Array<Subscription> = []
    //variable quee contiene el nombre del artista que vamos a buscar
    src:string = ""
   
  constructor(private trackService: TrackService) {}
  
  ngOnInit(): void {}
  ngOnDestroy(): void {}

      //funcion caturar el texto ingresado en el input
      callSearch (term:string){
      //generando lenght de caracteres minimos para buscar una cancion
      if (term.length >= 3) {
        console.log ('capturando texto desde el buscador',term)
      //llamamos a nuestro servicio de busqueda
      this.tracks = this.trackService.searchTracks$(term)
      }
      }
    
}
    