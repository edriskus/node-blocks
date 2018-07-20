import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  constructor(
    private http: HttpClient
  ) { }

  public doLogin({ email, password }): Observable<any> {
    return this.http.post('/login', { email, password })
  }
}
