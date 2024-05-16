import { Component, OnDestroy, OnInit } from '@angular/core';
import { tracksModel } from '../../../../core/models/tracks.model';
import { TrackService } from '../../../../shared/services/track.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-track-pages',
  templateUrl: './track-pages.component.html',
  styleUrl: './track-pages.component.css'
})
export class TrackPagesComponent implements OnInit, OnDestroy {

  tracksTrending: Array<tracksModel> = []
  tracksRandom: Array<tracksModel> = []
  //lista de observables
  listObservers$: Array<Subscription> = []

  constructor(private trackService: TrackService) {

  }

  ngOnInit(): void {
//funciones que se ejecutan al iniciar el modulo
    this.loadData()

  }


  //funcion de cargar canciones del servicio
   loadData(): void {
    this.trackService.getAllTracks$().subscribe((response: tracksModel[]) => {

      //definiendo listas de canciones
      this.tracksRandom = response
      this.tracksTrending = response
      console.log("capturando canciones desde el componente ",response)
      //cuando finaliza el subcribe se puede adicionar un capturador de errores
    }, err =>{ console.log ( "ocurrio un error al cargar las canciones", err)})
  }


  ngOnDestroy(): void {

  }

}
