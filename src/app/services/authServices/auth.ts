import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserModule, UserResponse } from '../../Dtos/userResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURI = 'http://localhost:7297/api/Auth';

  private userModulesSubject = new BehaviorSubject<UserModule[]>(this.getUserModulesFromStorage());
  public userModules = this.userModulesSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  userLogin(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiURI}/login`, user, { withCredentials: true }).pipe(
      tap((response) => {
        if (response) {
          console.log(response);
          localStorage.setItem('userModules', JSON.stringify(response.userModules));
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

  logout(): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiURI}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => localStorage.removeItem("userModules")))
  }

  userMenueRefresh(): Observable<UserModule[] | null> {
    return this.http.get<UserModule[]>(`${this.apiURI}/RefreshMenu`, { withCredentials: true })
      .pipe(
        tap((data) => {
          if (data) {
            localStorage.setItem('userModules', JSON.stringify(data));
            this.userModulesSubject.next(data);
          }
        }),
        catchError(() => of(null))
      );
  }

  private getUserModulesFromStorage(): UserModule[] {
    const data = localStorage.getItem('userModules');
    return data ? (JSON.parse(data) as UserModule[]) : [];
  }
}