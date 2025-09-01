import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURI = 'http://localhost:7297/api/Auth/login';
  constructor(private http: HttpClient) { }

  userLogin(user: User): Observable<any> {
    return this.http.post(this.apiURI, user)
  }
}
