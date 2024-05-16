import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of,throwError } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //llamamos a la api
  private readonly URLAPI = "http://localhost:3001/api"
  public errorNessage = ''
  public token:boolean = false

  constructor( private httpClient: HttpClient, private cookie: CookieService ) { }



  //servicio login de usuario
  sendCredentials(
    email:string,
    password:string

  ):Observable<any>{
  
    const body = {
    email,
    password
  }   
    return  this.httpClient.post(`${this.URLAPI}/auth/login`,body );
  
  }

//servicio crear uusuuario
 createAccount( 
  name:string,
  age:string,
  email:string,
  password:string ):Observable<any>{
    
    const body = {
      name,
      age,
      email,
      password
    }
    return  this.httpClient.post(`${this.URLAPI}/auth/register`,body );

  }




}




