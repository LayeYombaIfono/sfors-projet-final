import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/Utilisateur';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private readonly baseUrl: string = `${environment.apiUrl}/utilisateur`;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // GET /utilisateur/{uuid}
  getUtilisateur(uuid: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/${uuid}`, { headers: this.headers });
  }

  // PUT /utilisateur/{uuid}
  updateUtilisateur(uuid: string, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl}/${uuid}`, utilisateur, { headers: this.headers });
  }

  // DELETE /utilisateur/{uuid}
  deleteUtilisateur(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${uuid}`, { headers: this.headers });
  }

  // GET /utilisateur
  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.baseUrl, { headers: this.headers });
  }

  // POST /utilisateur
  createUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.baseUrl, utilisateur, { headers: this.headers });
  }

  // GET /utilisateurEmail/{email}
  getUtilisateurByEmail(email: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}Email/${email}`, { headers: this.headers });
  }

  // GET /utilisateur/password/{username}/{password}
  verifyPassword(username: string, password: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/password/${username}/${password}`,
      { headers: this.headers }
    );
  }
}

