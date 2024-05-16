import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private toast: NgToastService, private cookie: CookieService, private jwtDecoder: JwtDecoderService, private router:Router ) { }

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
          console.log("fecha de expiracion del token formato Epoch", expiresDate)

          //convirtiendo los el sistema de fecha Epoch  en horas 
          const eventTimestamp = expiresDate!;  // This represents a future date and time

          // Get the current epoch timestamp
          const currentTimestamp = Date.now() / 1000;  // Convert milliseconds to seconds

          // Calculate the time remaining in seconds
          const timeRemaining = eventTimestamp - currentTimestamp;
          const hours = Math.floor(timeRemaining / 3600);
          console.log("horas", hours)

          //guardando en cookies el token         
          this.cookie.set('token', tokenSession, hours, '/')
          console.log("cookie", this.cookie)
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












}

