import { Injectable } from '@angular/core';
import { Observable, of, timeout } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { tracksModel } from '../../core/models/tracks.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URLAPI = "http://localhost:3001/api"

  constructor(private httpClient: HttpClient) { }


  // funcion ignorar cancion por id
  private skipById(listTracks: tracksModel[], id: number): Promise<tracksModel[]> {
    return new Promise((resolve, reject) => {
      const list = listTracks.filter(a => a.id === id)
      resolve([])
    })
  }


  //servicio obtener todas las canciones
  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URLAPI}/tracks`).pipe(
      //aplicando filtro para mapear  data
      map((dataRaw: any) => { return dataRaw.data }),
      //aplicando filtro para capturar errores
      catchError((error) => { console.log('ocurrio un error en el serviciogetAllTracks',error); return of([]) })
    )
  }

  //servicio creacion de cancion
  createTrack$(
    name:string,
    album:string,
    artist_name:string,
    artist_nickname:string,
    artist_nationality:string,
    duration_start:number,
    duration_end:number,
    mediaId:number,
    songId:number
  ):Observable<any>{
       
    const body = {name,album, artist_name,artist_nickname,artist_nationality, duration_start,duration_end, mediaId, songId}
            return  this.httpClient.post(`${this.URLAPI}/tracks`,body );
    
    }

    //servicio eliminar cancion
    deleteTrack$(trackId:any):Observable<any>{ 
      return this.httpClient.delete(`${this.URLAPI}/tracks/${trackId}`) 
      
    }


















}


