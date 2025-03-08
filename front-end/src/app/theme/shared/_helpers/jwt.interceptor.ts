import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const user = this.authenticationService['userValue'];
    const isLoggedIn = user?.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiIiLCJzdWIiOiJrbG0iLCJleHAiOjE2OTc0OTI1MzQsImlhdCI6MTY5NzQ3NDUzNCwianRpIjoiM2IyMGJiOTctMmVkZC00ODM5LWI1MGYtOWYxMWViYTg1OGM5In0.679Ja1y3Q7z2bWKeRArBMNMLUV3RYyaH9PMYDeSsKP2PuXkwKz_0VA1b0z8pQuAXmFYpM5Ts6XeDTYrdO98qnQ`
        }
      });
    }

    return next.handle(request);
  }
}
