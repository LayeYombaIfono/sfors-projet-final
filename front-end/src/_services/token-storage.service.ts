import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";
import * as CryptoJS from 'crypto-js';
import { environment } from "src/environments/environment.prod";


const TOKEN_KEY = "auth-token-guine";
const USER_KEY = "auth-user";
const ROLE_KEY = "role";
const data2 = environment.key;

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    sessionStorage.clear();
  }

  saveToken(token: string): void {
    //console.log(token)
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, this.encryptData(token));
  }

  getToken(): string {
    let token  = sessionStorage.getItem(TOKEN_KEY)
    let tokenFinal : string;
   
    if(token == null )
    {
      tokenFinal = ''
    }
    else{
      tokenFinal = token
    }
    let tok = this.decryptData(tokenFinal);
    if(tok == '')
    {
      return ''
    }
    
    return tok;

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  saveUser(user: any): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  saveRole(role: string) {
    sessionStorage.removeItem(ROLE_KEY);
    sessionStorage.setItem(ROLE_KEY, JSON.stringify(role));
  }

  getUser(): any {
    // const user = sessionStorage.getItem(USER_KEY);
    const user = this.getDecodedAccessToken(this.getToken()).sub;

    // if (user) {
    //   return JSON.parse(user);
    // }

    return user;
  }

  getRole(): any {
    // const role = sessionStorage.getItem(ROLE_KEY);
    const role = this.getDecodedAccessToken(this.getToken()).aud;

    // if (role) {
    //   return JSON.parse(role);
    // }

    return role;
  }

  encryptData(data:string){

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), data2).toString();
    } catch (e) {
      console.log(e);
      return ''
    }
  }

  decryptData(data:string ){

    try {
      const bytes = CryptoJS.AES.decrypt(data, data2);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
      return null
    }
  }


}
