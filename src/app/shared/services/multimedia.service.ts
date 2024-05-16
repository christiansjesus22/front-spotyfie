import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of,throwError } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callBack:EventEmitter <any> = new EventEmitter<any>()

  private readonly URLAPI = "http://localhost:3001/api"
  public errorNessage = ''



constructor( private httpClient: HttpClient, private cookie: CookieService ) { }

//funcion subir imagen 
  uploadImg(formData:FormData):Observable<any>{
  return  this.httpClient.post<FormData>(`${this.URLAPI}/storage`,formData);
  }

  //funcion subir cancion mp3
  uploadSong(formData:FormData):Observable<any>{
    return  this.httpClient.post<FormData>(`${this.URLAPI}/songStorage`,formData);    
    }


}



 