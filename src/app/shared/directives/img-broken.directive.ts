import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  
 //directiva hostlistener que permite monitorizaar al host. 
 //utilizando eventos nativos del html podemos capturar el error con el hostlistener.
  @HostListener('error') handleErrorImg():void{
 // utilizando la propiedad nativeElement podemos identificar el elemento nativo 
    const elNative = this.HOST.nativeElement
    console.log('esta imagen no carga',this.HOST)
    console.log('este es el elemento nativo',  elNative)
//podemos modificar el src de la imagen entrando en la propiedad el elemento
    elNative.src = 'https://picsum.photos/200/300'
  }

//el host es el area de actuacion de la directiva.
  constructor(  private HOST: ElementRef) {}

}
