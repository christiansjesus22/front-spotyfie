import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service'
//importando servicio de alertas
import { Message, NgToastService } from 'ng-angular-popup';
//importando servicio de redireccionamiento
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-pages',
  templateUrl: './register-pages.component.html',
  styleUrl: './register-pages.component.css'
})
export class RegisterPagesComponent implements OnInit {
  
  //inicializamos la variable de formGroup
  formRegister: FormGroup = new FormGroup({});
  //capturador de msg de error
  errorNessage: string = ''

constructor(private authService: AuthService, private toast: NgToastService, private router:Router){}

ngOnInit(): void {

//definimos los campos y validaciones del formulario
  this.formRegister = new FormGroup({
    name: new FormControl('',
    [
      //agregando validaciones
      Validators.required,
      Validators.minLength(3),
    ]),
    age: new FormControl('',
    [
      Validators.required,
      Validators.min(5)
    ]),
    email: new FormControl('',
      [
        Validators.required,
        Validators.email,
      ]),
     password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]
    ),
    confirmPassword: new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]
  )

  }, 
  //llamando a la validacion personalizada
  { validators:this.passwordMatchValidator}
)

}

//funcion comparar contrasenhas
passwordMatchValidator (control:AbstractControl) {
  return control.get('password')?.value === control.get('confirmPassword')?.value? null:{mismatch:true}
}

//funcion crear cuenta
CreateAccount():void{

  const {name,age,email,password} = this.formRegister.value

  this.authService.createAccount(name,age,email,password).subscribe({
    next: (res) => {
      //alert message sucess
      this.toast.success({ detail: "SE A CREADO LA CUENTA!", summary: "Ahora puedes iniciar sesion" });

      this.router.navigate(['/','auth'])
    },
    error: (error) => {
      //capturando mensaje de error desde el express validator 
      this.errorNessage = error.error.error,
        //alert message error
        this.toast.error({ detail: "ERROR AL CREAR UN USARIO", summary: this.errorNessage, duration: 5000 });
      console.log(error)
    }
  })

}


showPassword(){

  //buscamos el elemento con id de password
  let typeValuePassword = (document.getElementById("password") as HTMLInputElement)
  let typeValuePasswordConfirm = (document.getElementById("passwordConfirm") as HTMLInputElement)
  //buscamos el elemento con id del icono de password
  let typeValueIcon = (document.getElementById("iconPassword") as HTMLInputElement)
  
  //contrasenha invisible
  if (typeValuePassword.type == "text") {
    typeValuePassword.type = "password"
    typeValuePasswordConfirm.type ="password"
    typeValueIcon.className = "uil uil-eye-slash"
  }
  //contrasenha visible
  else{
    typeValuePassword.type = "text"
    typeValuePasswordConfirm.type ="text"
    typeValueIcon.className= "uil uil-eye"

    //tiempo para que vuelva a ser invisible2
    setTimeout(() => {
    typeValuePassword.type = "password"
    typeValuePasswordConfirm.type ="password"
    typeValueIcon.className = "uil uil-eye-slash"
    },3000);

  }
   console.log (typeValuePassword.type)
   console.log (typeValueIcon.className)

}


}
