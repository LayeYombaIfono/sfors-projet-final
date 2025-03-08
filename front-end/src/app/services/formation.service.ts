import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Formation } from '../models/Formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

   private formationUrl:string = `${environment.apiUrl}/formation`;

  constructor(private httpClient:HttpClient) { }


  addFormation(formation:Formation){
      return this.httpClient.post<Formation>(
        `${this.formationUrl}`,
        formation,
        {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
          }),
        }
      );
    }

     getFormations(){
        return this.httpClient.get<Formation[]>(`${this.formationUrl}/all`,
          {
            headers: new HttpHeaders({
              "Content-Type": "application/json",
            }),
          });
      }

      getFormation(uuid:String){
          return this.httpClient.get<Formation>(`${this.formationUrl}/${uuid}`,
          {
            headers: new HttpHeaders({
              "Content-Type": "application/json",
            }),
          }
          );
        }



        updateFormation(formation:Formation){
            return this.httpClient.put<Formation>(
              `${this.formationUrl}/${formation.uuid}`,
              formation,
              {
                headers: new HttpHeaders({
                  "Content-Type": "application/json",
                }),
              }
            );
            
          }

          deleteFormation(uuid:String){
           return this.httpClient.delete<any>(`${this.formationUrl}/${uuid}`,
            {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
              }),
            }
            ).toPromise();
          }
}
