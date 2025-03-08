import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenStorageService } from "./token-storage.service";
import { Router } from "@angular/router";
const AUTH_API = environment.apiUrl + `/authenticate`;
const LOGOUT_API = environment.apiUrl + `/api/auth/logout`;
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class AuthService {
 // constructor(private http: HttpClient) {}

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  login(username: string, password: string) {
    console.log(`user: ${username}`);
    return this.http
      .post(AUTH_API, { username, password }, httpOptions)
      .toPromise()
      .then((res) => res);
  }

  logout(): void {
    // Récupérer l'identifiant de l'utilisateur
    const user = this.tokenStorage.getUser();
    
    // Appeler le backend pour se déconnecter
    this.http.post(LOGOUT_API, { email: user }, httpOptions)
      .subscribe({
        next: res => {
          console.log('Déconnexion réussie:', res);
          // Effacer le stockage local/session
          this.tokenStorage.signOut();
          
          
          this.router.navigate(['/auth/signin-v2']); 
        },
        error: err => {
          console.error('Erreur lors de la déconnexion:', err);
          // Effacer le stockage local/session
          this.tokenStorage.signOut();
          
          // Utiliser la même route correcte ici aussi
          this.router.navigate(['/auth/signin-v2']); 
        }
      });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + "signup",
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }
}
