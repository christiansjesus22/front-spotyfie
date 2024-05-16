import { Component, Input, OnInit } from '@angular/core';
import { tracksModel } from '../../../core/models/tracks.model';
import { TrackService } from '../../services/track.service';
//importando modulo de alertas
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrl: './play-list-body.component.css'
})
export class PlayListBodyComponent implements OnInit {


@Input()dataTracks: Array<tracksModel>= []
@Input() mySong:Boolean = true

optionOrder : {property:string |null, order:string} = {property:null, order :'desc'}


constructor(private trackService: TrackService,private toast: NgToastService,){}

  ngOnInit(): void {
   
  }

  changeOrder(property :string):void {
    const {order} =this.optionOrder
  this.optionOrder ={
  property,
  order:order === 'asc' ? 'desc' :'asc'
   }  
  
  console.log(this.optionOrder)
  }


  //funcion eliminar cancion
  deleteTrack(trackId:number,trackName:string):void{
  
    if (confirm("seguro quieres eliminar la cancion?")) {
    
this.trackService.deleteTrack$(trackId).subscribe((response:any)=>{ 
  this.loadData()
   //modal de cancion eliminada
 this.toast.success({ detail: "SE AH ELIMINADO LA CANCION", summary: trackName});
 
})}}


// funcioncargar canciones
  loadData(): void {
    this.trackService.getAllTracks$().subscribe((response: tracksModel[]) => {
      //definiendo listas de canciones    
      console.log("capturando canciones desde el componente ",response.length)
      //cuando finaliza el subcribe se puede adicionar un capturador de errores
    }, err =>{ console.log ( "ocurrio un error al cargar las canciones", err)})
  }




}


