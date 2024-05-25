//importando pop-up
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';

//importando servicios
import { MultimediaService } from '../../../../shared/services/multimedia.service';
import {TrackService} from '../../../../shared/services/track.service'
//modelos de canciones
import { storageModel } from '../../../../core/models/storageModel'
import { songStorageModel } from '../../../../core/models/songStorageModel'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.css'
})
export class UploadPageComponent implements OnInit {
  namefileImage:string = ''
  //inicializamos la variable de formGroup
  formTrackCreate: FormGroup = new FormGroup({});
  //capturador de errores 
  errorNessage: string = ''
  //importando modelos de canciones
  imgId: any = []
  songId: any= []
  //definiendo los formData
  formDataImg: any = {}
  formDataSong: any = {} 
  //variables para el song preview
  songPreview :any = ''
  isPlaying:boolean = false;
  durationTotal = 0
  //variables para el image preview
  previewImage:string = 'https://wpimg.pixelied.com/blog/wp-content/uploads/2021/07/12182102/Spotify-Album-Cover-Size.png'


  constructor(private sanitizer:DomSanitizer, private toast: NgToastService, private router: Router, private multimediaService: MultimediaService, private tracksService:TrackService, ) { }

  ngOnInit(): void {


    ///definiendo valores del formulario
    this.formTrackCreate = new FormGroup({
      name: new FormControl('',
        [
          //agregando validaciones
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
    
        ]),

      album: new FormControl('',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ),
      artist_name: new FormControl('',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ),
      artist_nickname: new FormControl('',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ),
      artist_nationality: new FormControl('',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      )
      

    })

  }



  ///////////////////////////song/////////////////////////////////////////

  //capturando evento cancion
  getFileSong(event: Event) {
    const target = event.target as HTMLInputElement
    //capturando cancion
    var file : FileList | null = target.files   
    //capturando formato del archivo
    const fileType: FileList | any = target?.files?.[0].type
    const UrlSong: FileList | any = target?.files?.[0]

    //convirtiendo en url cancion capturada desde el event
    this.songPreview = URL.createObjectURL(UrlSong);
    
    //validando el formato del archivo
    if (fileType == "audio/mpeg") {

    } else {
      this.toast.error({ detail: "ERROR AL CARGAR LA PISTA DE AUDIO", summary: "Ingresa un tipo de archivo valido" });
      target.value = "" 
    }

    //objeto js que permite manejar el envio de archivos
    const formData = new FormData()
    Array.prototype.forEach.call(file, (file: File) => {
      formData.append("myFile", file)

      //salvando formdatade song
      this.formDataSong = formData
    })

  }

  //reproductor alternativo para cuando no sea compatible con el de html
   togglePlay() {
    var myAudio:any = document.getElementById("myAudio");
     return myAudio.paused ? myAudio.play() : myAudio.pause();

  };



  uploadFileSong (formDataSong: any){

    return new Promise((resolve, reject) => {
      console.log ("subiendo archivo mp3...")



  this.multimediaService.uploadSong(formDataSong).subscribe({
    next: (req) => {
      //guardando el objeto de cancion en una constante
     resolve (this.songId = req.data.id) 
    },
    error: (error: HttpErrorResponse) => {
      console.log("error al subir la imagen", error)
    }
  })
})
    
  }


  ///////////////////////////img///////////////////////////////////////
 
  //capturando evento img 
  getFileImg($event: Event) {
    const target = $event.target as HTMLInputElement
    console.log ("evento imagen", $event)

    //capturando ruta de la imagen en la respuesta
    const targetPreview: FileList | any = target?.files?.[0]
    //convirtiendo a base 64
    this.extrackBase64(targetPreview).then((image:any) =>{
      this.previewImage = image.base
      console.log ('imagen codificada',  this.previewImage)
    })

    //capturando imagen
    var file: FileList | null = target.files

    //capturando formato del archivo
    const fileType: FileList | any = target?.files?.[0].type
    console.log (fileType)
    //capturando nombre del archivo
    const filename: FileList | any = target?.files?.[0].name
    this.namefileImage = filename

    //validando el formato de imagen
    if (fileType == "image/png"|| fileType == "image/jpeg") {
    } else {
      this.toast.error({ detail: "ERROR AL CARGAR LA IMAGEN", summary: "Ingresa un tipo de archivo valido" });
      target.value = "" 
    }

    //objeto js que permite manejar el envio de archivos
    const formData = new FormData()
    Array.prototype.forEach.call(file, (file: File) => {
      formData.append("myFile", file)

      //salvando formdatade img
      this.formDataImg = formData
    })

  }

  extrackBase64 = async ($event:any) =>new Promise ((resolve,reject)=>{
    try {    
      const reader = new FileReader()
      reader.readAsDataURL($event)
      reader.onload =()=>{ 
        resolve({
          base:reader.result
        })}

        reader.onerror = error =>{
          resolve({
            base:null
          })
        }
      return console.log ("preview de imagen")
    } catch (error) {
      return null
      
    }
  })

  //subiendo archivo img
 
  uploadFileImg (formDataImg: any) {
    return new Promise((resolve, reject) => {

      console.log ("subiendo imagen...") 
         this.multimediaService.uploadImg(formDataImg).subscribe({
          next: (req) => {
            //guardando el objeto de cancion en una constante
            resolve( this.imgId = req.data.id)
            console.log("modelo storage img", this.imgId)
          },
          error: (error: HttpErrorResponse) => {
            console.log("error al subir la imagen", error.error.error)
            this.toast.error({ detail: "ERROR AL SUBIR TU CANCION", summary: error.error.error, duration:5000});

          }
        })
      
    })
  }



  //////////////////////track completo////////////////////////////////////////////////////
   async uploadTrack()  {
    var { name,album, artist_name,artist_nickname,artist_nationality, duration_start,duration_end, mediaId, songId } = this.formTrackCreate.value

    //llamando a las funciones de cargar imagenes y cancion
  let myidImg = await this.uploadFileImg(this.formDataImg)
  console.log (myidImg  ,"capturando id imagen")


 let myIdSong = await this.uploadFileSong(this.formDataSong)
   console.log (myIdSong  ,"capturando id cancion")

    //adjuntando los id de de los storages los id media 
     mediaId = this.imgId
     songId =  this.songId
     //tiempo inicial de la cancion
     duration_start = 0
     //tiempo total en segundos 
     let x :any|null = document.getElementById("myAudio");
     let y :any = x.duration
     duration_end  = y
     //console.log ()
     console.log (duration_end,'tiempo total de segundos')
   
   console.log ("lo que esta llegando a la funcion",name,album, artist_name,artist_nickname,artist_nationality, duration_start,duration_end, mediaId, songId)

 //enviamos la informacion  capturada al servicio de tracksServices
    this.tracksService.createTrack$(name,album, artist_name,artist_nickname,artist_nationality, duration_start,duration_end, mediaId, songId)
    .subscribe({

      next:(res) =>{

        //alert message sucess
        this.toast.success({ detail: "BIEN!!", summary: "Se ah creado la cancion con exito"});
        //navegamos directamente al componente tracks una vez finalizada la creacion
        this.router.navigate(['/','tracks'])
      },

      error: (error) => {
        //capturando mensaje de error desde el express validator 
        console.log(error)
        this.toast.error({ detail: "ERROR AL SUBIR TU CANCION", summary: error.error });

      }
    })

  }

}
