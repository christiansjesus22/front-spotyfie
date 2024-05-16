import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
//importando servicio de cookies
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class injecctSessionInterceptor implements HttpInterceptor {

constructor(private cookieService:CookieService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    try {
      const token = this.cookieService.get('token')
      console.log ( 'capturando token en el interceptor', token)
      let newRequest = req

      newRequest = req.clone(
        {
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



