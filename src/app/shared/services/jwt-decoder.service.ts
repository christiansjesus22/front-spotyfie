
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {
  
  public decodePayloadJWT(token: any) {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.log (Error)
      return null;
    }
  }
}


