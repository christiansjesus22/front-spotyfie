import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {

  //dejaamos la propiedad en publico para poderlo usar en el html
  // mainMenu va a contener 1 objeto con 2 propeidades las cuales son arrays que recorreremos
  public mainMenu: { defaultOptions: Array<any>, accessLink: Array<any> } = { defaultOptions: [], accessLink: [] }

  public customOptions: Array<any> = []

  constructor( private trackService: TrackService) { }

  ngOnInit(): void {

    //array de sidebar 01
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', 'tracks']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Canciones Favoritas',
        
        icon: 'uil-heart-medical',
        router: ['/', 'favorites'],
      }
    ]

    //array de sidebar 02
    this.mainMenu.accessLink = [
      {
        name: 'Sube tu Cancion',
        icon: 'uil-plus-square',
        router: ['/', 'upload']
      },
      {
        name: 'Mis Canciones',
        icon: 'uil uil-chart',
        router: ['/', 'mySongs']      
      },
      
    ]

    //array de objetos de mi lista
    this.customOptions = [
      {
        name: 'Mi lista º1',
      },
      {
        name: 'Mi lista º2',
        router: ['/']
      },
      {
        name: 'Mi lista º3',
        router: ['/']
      },
      {
        name: 'Mi lista º4',
        router: ['/']
      }
    ]

  }




}




