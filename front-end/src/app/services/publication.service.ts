import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Publication } from '../models/Publication';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private publicationUrl:string = `${environment.apiUrl}/publication`;

  publication!:Publication[];

  constructor(private httpClient:HttpClient) { }

   addPublication(publication:Publication){
          return this.httpClient.post<Publication>(
            `${this.publicationUrl}`,
            publication,
            {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
              }),
            }
          );
        }

          getPublications(){
                      return this.httpClient.get<Publication[]>(`${this.publicationUrl}/all`,
                        {
                          headers: new HttpHeaders({
                            "Content-Type": "application/json",
                          }),
                        });
                    }
              
       getPublication(uuid:String){
             return this.httpClient.get<Publication>(`${this.publicationUrl}/${uuid}`,
               {
                headers: new HttpHeaders({
                  "Content-Type": "application/json",
                }),
            });
       }

       getPublicationuuid(uuid:String){
        return this.httpClient.get<Publication>(`${this.publicationUrl}/${uuid}`)
         
  }

       getUuidPublication(uuid:String):Observable<Publication>{
        const url = `${this.publicationUrl}/${uuid}`;
        return this.httpClient.get<Publication>(url);
      }
         


        updatePublication(publication:Publication){
                    return this.httpClient.put<Publication>(
                   `${this.publicationUrl}/${publication.uuid}`,
                  publication,
                  {
               headers: new HttpHeaders({
               "Content-Type": "application/json",
            }),
          }
         );
                         
      }


      deletePublication(uuid:String){
        return this.httpClient.delete<any>(`${this.publicationUrl}/${uuid}`,
         {
           headers: new HttpHeaders({
             "Content-Type": "application/json",
           }),
         }
         ).toPromise();
       }



   



}
