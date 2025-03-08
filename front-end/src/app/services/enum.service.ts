import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor(private http: HttpClient) { }
  
  getGenre(): Observable<String[]> {
    let url = `${environment.apiUrl}/genre`;
    return this.http.get<String[]>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }
}
