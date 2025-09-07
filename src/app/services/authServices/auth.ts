import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURI = 'http://localhost:7297/api/Auth';
  constructor(private http: HttpClient, private router: Router) { }

  userLogin(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiURI}/login`, user, { withCredentials: true }).pipe(
      tap((response) => {
        if (response) {
          localStorage.setItem('userMenues', JSON.stringify(response.menuDetails));
        }
      })
    )
  }

  isLoggedIn(): Observable<boolean | 401> {
    return this.http.get<{ loggedIn: boolean }>(`${this.apiURI}/isLoggedIn`, { withCredentials: true }).pipe(
      map(res => res.loggedIn),
      catchError(() => of(false))
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiURI}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => localStorage.removeItem("userMenues")))
  }
}