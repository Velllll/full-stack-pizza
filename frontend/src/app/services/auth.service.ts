import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  setToken(token: string): void {
    localStorage.setItem('user_access_token', token)
  }

  getToken() {
    return localStorage.getItem('user_access_token')
  }

  isLogedIn() {
    let response$: Observable<any> = this.http.post<any>('http://localhost:5000/auth/islogin', {token: this.getToken()})
    response$.subscribe({
      next: (value => {
        if(value?.message) this.router.navigate(['/login'])
      }),
      error: err => console.log(err)
    })
    response$.subscribe
  }

  logout() {
    localStorage.removeItem('user_access_token')
    this.router.navigate(['/'])
  }
  getRole() {
    let info$ = this.http.post<any>('http://localhost:5000/auth/islogin', {token: this.getToken()})
    .pipe(
      map(r => (r.role))
    )
    return info$
  }
}
