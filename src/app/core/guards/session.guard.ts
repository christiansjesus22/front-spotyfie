import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn:'root'
})

 export class sessionGuardOld {  
  constructor(private cookie: CookieService, private router:Router){}
  
  
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
      
    return this.checkCookiSession()
  }

//funcion  de verificar cookie
checkCookiSession ():boolean{
  try {
    //verificando la existencia de una cookie llamada token
    const token:boolean = this.cookie.check('token')
    console.log ('cookie desde el guard',token)
    if (!token) {
      //generando redirecion al login
      this.router.navigate(['/','auth'])
    }
    return token
    
  } catch (error) {
   console.log ("error al capturar el token", error) 
    return  false

  }
}


}


export const sessionGuard: CanActivateFn = (route:ActivatedRouteSnapshot,state:RouterStateSnapshot) => {
return inject(sessionGuardOld).canActivate(route,state)
};
