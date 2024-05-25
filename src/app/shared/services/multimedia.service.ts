import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer, of, throwError } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { tracksModel } from '../../core/models/tracks.model';


@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callBack: EventEmitter<any> = new EventEmitter<any>()

  private readonly URLAPI = "http://localhost:3001/api"
  public errorNessage = ''
  //una forma de no inicializar una variable es colocando !: a la hora de definir el tipo de variable que sera
  //audio sera el reproductor
  public audio!: HTMLAudioElement
  //observer de cancion / y el objeto que va a contener el propiedades de la cancion
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  //tiempo actual
  public timeElampsed$: BehaviorSubject<string> = new BehaviorSubject("00:00")
  //tiempo rrestante
  public timeRemaind$: BehaviorSubject<string> = new BehaviorSubject("00:00")
   //estado de cancion/reproduccion
   public status$: BehaviorSubject<string> = new BehaviorSubject("paused")
   //barra de progreso
   public barProgress:BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private httpClient: HttpClient) {
    this.audio = new Audio()

    this.trackInfo$.subscribe(res => {
      if (res) {
        this.setAudio(res)
      }
    })

    this.listenAllEvents()


  }

  //funcion subir imagen 
  uploadImg(formData: FormData): Observable<any> {
    return this.httpClient.post<FormData>(`${this.URLAPI}/storage`, formData);
  }

  //funcion subir cancion mp3
  uploadSong(formData: FormData): Observable<any> {
    return this.httpClient.post<FormData>(`${this.URLAPI}/songStorage`, formData);
  }


  //funcion de reproducir el audio
  setAudio(track: tracksModel): void {
    console.log('cancion llegando desde el card plyer al servico multimedia', track)

    //resolviendo el problema de la super posicion de audios
    if (this.audio) {
      this.audio.pause(); // Pausa la reproducción actual
      this.audio.src = ""; // Elimina la fuente de audio
      this.audio.load(); // Recarga el audio para liberar recursos
    }
    //tuve que inicializarlo desde la misma funcion pq me saltaba error desde el constructor 
    this.audio = new Audio(track?.songStorage?.url)
    this.audio.play()
    // llamamos la funcion de escuchar eventos
    this.listenAllEvents()
  }



  private listenAllEvents(): void {
    this.audio.addEventListener("timeupdate", this.calculateTime, false)
    this.audio.addEventListener("playing", this.setPlayerStatus, false)
    this.audio.addEventListener("play", this.setPlayerStatus, false)
    this.audio.addEventListener("pause", this.setPlayerStatus, false)
    this.audio.addEventListener("ended", this.setPlayerStatus, false)
  }


  //funcion controlador de player paused/play/playing
  togglePlayer() {
    if (this.audio.paused) {
      this.audio.play()
    } else {
      this.audio.pause()
    }

  }


  //funcion calcular y mostrar el tiempo total de la cancion
  calculateTime = () => {
    let durationTime = this.audio.duration;
    let CurrentTime = this.audio.currentTime;
    this.setTimeClapsed(CurrentTime)
    this.setTimeDuration(durationTime)
    this.setPercentage(CurrentTime,durationTime)
  }

  //funcion tiempo total
  setTimeDuration(durationTime: number) {
    let seconds = Math.floor(durationTime % 60)
    let minutes = Math.floor(durationTime / 60) % 60

    //variable de formato de segundos y minutos
    let FormartSeconds = ''
    let formarMinutes = ''

    FormartSeconds = `${seconds}`
    formarMinutes = `${minutes}`
    //FORMATO DE MINUTOS:SEGUNDOS
    const displayFormat = `${formarMinutes}:${FormartSeconds}`
    this.timeRemaind$.next(displayFormat)
  }


  //funcion tiempo transcurrido
  setTimeClapsed(CurrentTime: number) {

    ///obteniendo valor entero de segundos y minutos
    let seconds = Math.floor(CurrentTime % 60)
    let minutes = Math.floor(CurrentTime / 60) % 60


    //variable de formato de segundos y minutos
    let FormartSeconds = ''
    let formarMinutes = ''


    //formateando 0 al de segundos y minutos
    if (seconds < 10) { FormartSeconds = `0${seconds}` }
    else { FormartSeconds = `${seconds}` }

    if (minutes < 10) { formarMinutes = `0${minutes}` }
    else { formarMinutes = `${minutes}` }

    //FORMATO DE MINUTOS:SEGUNDOS
    const displayFormat = `${formarMinutes}:${FormartSeconds}`
    this.timeElampsed$.next(displayFormat)

  }



  //funcion calcular estado del reproductor/cancion ---utilizar arroy function
  setPlayerStatus =(state: any) =>  {
    switch (state.type) {
      case 'play':
        this.status$.next('play');
        break;
      case 'playing':
        this.status$.next('playing');
        break;
      case 'ended':
        this.status$.next('ended');
        break;
      default:
        this.status$.next('paused');
        break;
    }
  }


  //funcion calcular % porcentaje de progreso del reproductor
  setPercentage (currentTime:number, duration:number):void {
    let persentage = (currentTime *100)/duration 
    this.barProgress.next (persentage)
    console.log("porcentaje actual" ,persentage )
  }


}




