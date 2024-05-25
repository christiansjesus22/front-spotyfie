import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent implements OnInit {

//variable nombre de usuario
userName:string=''

constructor(private cookie:CookieService){}


login(){

  this.userName = this.cookie.get ("NameUser")

}


ngOnInit(): void {
  this.login()
}


logOutSession(){
  this.cookie.deleteAll();
  window.location.reload();


}



}
