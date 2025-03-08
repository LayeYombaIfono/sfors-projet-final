import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Affectation } from 'src/app/models/Affectation';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {
 private affectationUrl:string = `${environment.apiUrl}/affectation`;

  constructor(private httpClient:HttpClient) { }

  addAffectation(affectation:Affectation){
        return this.httpClient.post<Affectation>(
          `${this.affectationUrl}`,
          affectation,
          {
            headers: new HttpHeaders({
              "Content-Type": "application/json",
            }),
          }
        );
      }


       getAffectations(){
              return this.httpClient.get<Affectation[]>(`${this.affectationUrl}`,
                {
                  headers: new HttpHeaders({
                    "Content-Type": "application/json",
                  }),
                });
            }
      
            getAffectation(uuid:String){
                return this.httpClient.get<Affectation>(`${this.affectationUrl}/${uuid}`,
                {
                  headers: new HttpHeaders({
                    "Content-Type": "application/json",
                  }),
                }
                );
              }
      
      
      
              updateAffectation(affectation:Affectation){
                  return this.httpClient.put<Affectation>(
                    `${this.affectationUrl}/${affectation.uuid}`,
                    affectation,
                    {
                      headers: new HttpHeaders({
                        "Content-Type": "application/json",
                      }),
                    }
                  );
                  
                }
      
                deleteAffectation(uuid:String){
                 return this.httpClient.delete<any>(`${this.affectationUrl}/${uuid}`,
                  {
                    headers: new HttpHeaders({
                      "Content-Type": "application/json",
                    }),
                  }
                  ).toPromise();
                }
}
