import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackService } from '../../../../shared/services/track.service';
import { tracksModel } from '../../../../core/models/tracks.model';
//importando modulo de alertas
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-my-songs-page',
  templateUrl: './my-songs-page.component.html',
  styleUrl: './my-songs-page.component.css'
})
export class MySongsPageComponent  implements OnInit, OnDestroy  {


//variable numero de canciones agregadas
tracksLength: number = 0 
tracks: Array<tracksModel> = []

  constructor(private trackService: TrackService,private toast: NgToastService){}
  
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
