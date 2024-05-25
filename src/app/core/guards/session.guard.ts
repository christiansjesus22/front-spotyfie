import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn:'root'
})

 export class sessionGuardOld {  
  
  //al ser una clase podemo implementar un constructor y llamar a nuestro servicio de cokies
  constructor(private cookie: CookieService, private router:Router){}
  
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
    //llamamos a la funcion de verificar cokie  
    return this.checkCookiSession()
  }

//funcion  de verificar cookie 
checkCookiSession ():boolean{
  try {
    //verificando la existencia de una cookie llamada token
    const token:boolean = this.cookie.check('token')
    console.log ('resultado de verificar la cokie desde el guard',token)

    if (!token) {
      //generando redirecion al login
      this.router.navigate(['/','auth'])
    }
    return token //:true 
    
  } catch (error) {
   console.log ("error al capturar el token", error) 
    return  false

  }
}

}

//nuevo guard
export const sessionGuard: CanActivateFn = (route:ActivatedRouteSnapshot,state:RouterStateSnapshot) => {
return inject(sessionGuardOld).canActivate(route,state)
};
