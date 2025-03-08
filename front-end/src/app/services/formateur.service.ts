import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Formateur } from '../models/Formateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
   private formateurUrl:string = `${environment.apiUrl}/formateur`;

  constructor(private httpClient:HttpClient) { }

  addFormateur(formateur:Formateur){
        return this.httpClient.post<Formateur>(
          `${this.formateurUrl}`,
          formateur,
          {
            headers: new HttpHeaders({
              "Content-Type": "application/json",
            }),
          }
        );
      }


       getFormateurs(){
              return this.httpClient.get<Formateur[]>(`${this.formateurUrl}`,
                {
                  headers: new HttpHeaders({
                    "Content-Type": "application/json",
                  }),
                });
            }

        getFormateurss() {
          return this.httpClient.get<Formateur[]>(`${this.formateurUrl}`,
            {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
              }),
            });

        }
      
            getFormateur(uuid:String){
                return this.httpClient.get<Formateur>(`${this.formateurUrl}/${uuid}`,
                {
                  headers: new HttpHeaders({
                    "Content-Type": "application/json",
                  }),
                }
                );
              }
      
      
      
              updateFormateur(Formateur:Formateur){
                  return this.httpClient.put<Formateur>(
                    `${this.formateurUrl}/${Formateur.uuid}`,
                    Formateur,
                    {
                      headers: new HttpHeaders({
                        "Content-Type": "application/json",
                      }),
                    }
                  );
                  
                }
      
                deleteFormateur(uuid:String){
                 return this.httpClient.delete<any>(`${this.formateurUrl}/${uuid}`,
                  {
                    headers: new HttpHeaders({
                      "Content-Type": "application/json",
                    }),
                  }
                  ).toPromise();
                }
}
