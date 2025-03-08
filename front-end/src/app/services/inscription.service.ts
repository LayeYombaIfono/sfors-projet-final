import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Inscription } from '../models/Inscription';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private inscriptionUrl:string = `${environment.apiUrl}/inscription`;

constructor(private httpClient:HttpClient) { }

  addInscription(inscription:Inscription){
      return this.httpClient.post<Inscription>(
        `${this.inscriptionUrl}`,
        inscription,
        {
            headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
      });
  }

  updateInscription(inscription:Inscription){
      return this.httpClient.put<Inscription>(
          `${this.inscriptionUrl}/${inscription.uuid}`,
           inscription,
           {
            headers: new HttpHeaders({
            "Content-Type": "application/json",
          }),
      });               
  }
    
  getInscriptions(){
    return this.httpClient.get<Inscription[]>(`${this.inscriptionUrl}/all`,
        {
          headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
    });
  }

  getInscription(uuid:String){
       return this.httpClient.get<Inscription>(`${this.inscriptionUrl}/${uuid}`,
           {
            headers: new HttpHeaders({
            "Content-Type": "application/json",
           }),
          });
      }

  deleteInscription(uuid:String){
    return this.httpClient.delete<any>(`${this.inscriptionUrl}/${uuid}`,
      {
        headers: new HttpHeaders({
        "Content-Type": "application/json",
        }),
      }).toPromise();
  }
}
