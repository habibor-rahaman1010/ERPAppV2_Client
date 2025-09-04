import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURI = 'http://localhost:7297/api/Auth/login';
  constructor(private http: HttpClient) { }

  userLogin(user: User): Observable<any> {
    return this.http.post<any>(this.apiURI, user).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userMenues', JSON.stringify(response.menuDetails));
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}