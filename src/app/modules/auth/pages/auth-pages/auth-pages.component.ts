import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service'
//importando servicio de alertas
import { NgToastService } from 'ng-angular-popup';
import { CookieService } from 'ngx-cookie-service';
import { JwtDecoderService } from '../../../../shared/services/jwt-decoder.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth-pages',
  templateUrl: './auth-pages.component.html',
  styleUrl: './auth-pages.component.css'
})
export class AuthPagesComponent implements OnInit {


  //inicializamos la variable de formGroup
  formLogin: FormGroup = new FormGroup({});
  //capturador de msg de error
  errorNessage: string = ''
  element:any|unknown = ''

  
  constructor(private elementRef: ElementRef<HTMLElement>, private authService: AuthService, private toast: NgToastService, private cookie: CookieService, private jwtDecoder: JwtDecoderService, private router:Router ) { }

  ngOnInit(): void {


    this.formLogin = new FormGroup({

      email: new FormControl('',
        [
          //agregando validaciones
          Validators.required,
          Validators.email,
        ]),

      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      )
    })

  }


  // funcion capturar informacion
  sendLogin(): void {
    const { email, password } = this.formLogin.value
    //enviamos la informacion  capturada al servicio authServices
    this.authService.sendCredentials(email, password).subscribe({
        next: (res) => {
          
          //alert message sucess
          this.toast.success({ detail: "BIENVENIDO", summary: res.data.user.name });
          console.log("sesion iniciada", res.data);

          // obteniendo el token
          const tokenSession = res.data.token
          console.log("string del token", tokenSession,)
          //decodificando token
          const tokenDecode = this.jwtDecoder.decodePayloadJWT(tokenSession)
          //obteniendo  el dataExpires token
          const expiresDate = tokenDecode?.exp
          var customTokenDecode:any = tokenDecode
          //obteniendo el id y rol del usuario
          console.log("fecha de expiracion del token formato Epoch", expiresDate)
          console.log ('token decodificado', tokenDecode)

          //convirtiendo los el sistema de fecha Epoch  en horas 
          const eventTimestamp = expiresDate!;  // This represents a future date and time

          // Get the current epoch timestamp
          const currentTimestamp = Date.now() / 1000;  // Convert milliseconds to seconds
 
          // Calculate the time remaining in seconds
          const timeRemaining = eventTimestamp - currentTimestamp;
          const hours = Math.floor(timeRemaining / 3600);
          console.log("horas validas del token", hours)

          //guardando en cookies el token         
          this.cookie.set('token', tokenSession, hours, '/')
          //guardando informacion del usuario en una cokie
          this.cookie.set('idUser',customTokenDecode.id, hours, '/')
          this.cookie.set('NameUser',res.data.user.name, hours, '/')
          this.cookie.set('roleUser',customTokenDecode.role, hours, '/')
          console.log("cookies", this.cookie)

          //redireccionando a la paginan de canciones
          this.router.navigate(['/','tracks'])
        },
        error: (error) => {
          //capturando mensaje de error desde el express validator 
          this.errorNessage = error.error.error,
            //alert message error
            this.toast.error({ detail: "ERROR AL INICIAR SESION", summary: this.errorNessage, duration: 5000 });
          console.log(error)
        }
      });

  }

//funcion mostrar contrasenha
showPassword(){

  //buscamos el elemento con id de password
  let typeValue = (document.getElementById("password") as HTMLInputElement)
  //buscamos el elemento con id del icono de password
  let typeValueIcon = (document.getElementById("iconPassword") as HTMLInputElement)
  
  //contrasenha invisible
  if (typeValue.type == "text") {
    typeValue.type = "password"
    typeValueIcon.className = "uil uil-eye-slash"
  }
  //contrasenha visible
  else{
    typeValue.type = "text"
    typeValueIcon.className= "uil uil-eye"

     //tiempo para que vuelva a ser invisible2
     setTimeout(() => {
      typeValue.type = "password"
      typeValueIcon.className = "uil uil-eye-slash"
      },3000);
  }
   console.log (typeValue.type)
   console.log (typeValueIcon.className)

}


}

