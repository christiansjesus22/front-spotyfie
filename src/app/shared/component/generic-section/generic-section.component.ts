import { Component,Input,OnInit} from '@angular/core';
import { tracksModel } from '../../../core/models/tracks.model';

@Component({
  selector: 'app-generic-section',
  templateUrl: './generic-section.component.html',
  styleUrl: './generic-section.component.css'
})
export class GenericSectionComponent  implements OnInit {

@Input()title :string =''
@Input()mode: 'small'| 'big'='small'
@Input()dataTracks: Array<tracksModel>= []

constructor(){}

ngOnInit(): void {}
  
}

