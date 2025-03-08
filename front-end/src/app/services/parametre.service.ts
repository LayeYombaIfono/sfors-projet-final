import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParametreType, ParemetreConfig } from '../models/Parametre';
import { Page } from '../models/Page';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ParemetreConfigService {

  private readonly parametreNameUrl: string =`${environment.apiUrl}` + `/parametre`;


  constructor(private http : HttpClient) { }

  public newParemetreConfig (parametre : any ) : Observable<any> {
    return this.http.post<any>(`${this.parametreNameUrl}/save`,parametre)
  }
  public updateParemetreConfig(parametre : ParemetreConfig) : Observable <ParemetreConfig> {
    return this.http.put<ParemetreConfig> (`${this.parametreNameUrl}/update/${parametre.uuid}`,parametre)
 }
 public getOneParemetreConfig(uuidParemetreConfig : string): Observable  <ParemetreConfig> {
  return  this.http.get<ParemetreConfig>(`${this.parametreNameUrl}/${uuidParemetreConfig}`)
  }

  public getActuelParametre(parametre :ParametreType): Observable  <ParemetreConfig> {
    return  this.http.get<ParemetreConfig>(`${this.parametreNameUrl}Actuel/${parametre}`)
  }
  public getAllParemetreConfig () : Observable  <any> {
    return this.http.get<any>(`${this.parametreNameUrl}?page=0&size=10`)
  }
  public deleteParemetreConfig (uuidParemetreConfig : string): Observable <any> {
    return this.http.delete<void>(`${this.parametreNameUrl}/delete/${uuidParemetreConfig}`)

  }

  getParametres(page:Page, key:String): Observable<any> {
    let url = `${this.parametreNameUrl}?key=${key}&page=${page.pageNumber}&size=${page.size}`;
    return this.http.get<any>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  getParametreCombo(): Observable<any> {
    let url = `${environment.apiUrl}/parametreCombo`;
    return this.http.get<any>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }
  
}
