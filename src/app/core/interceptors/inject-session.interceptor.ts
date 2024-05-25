import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
//importando servicio de cookies
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class injecctSessionInterceptor implements HttpInterceptor {

constructor(private cookieService:CookieService){}

 //httpRequest hace referencia a toda la propiedad del header 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    try {
      //capturamos el token de la cokie
      const token = this.cookieService.get('token')
      console.log ( 'capturando token en el interceptor', token)
      let newRequest = req

      //decimos que el new req sera igual req
      newRequest = req.clone(
        {
          //agregamos en el nuevo req la proppiedad de authorization, que sera igual al token de la cokie
          setHeaders:{
            authorization: `Bearer ${token}`
          }
        }
      )

      return next.handle(newRequest);
    } 
    catch (error) {
      console.log ("error en el interceptor de session", error)
      return next.handle(req);
    }
    return next.handle(req);
  }
}



