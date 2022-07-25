import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  response$!: Observable<{token: string, role: string}>

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('user@user.com', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('user1234',[
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ]),
    })
  }

  submitLogin() {
    this.response$ = this.http.post<{token: string, role: string}>('http://localhost:5000/auth/login', this.loginForm.value)
    this.response$.subscribe({
      next: (r) => {
        this.authService.setToken(r.token)
        if(r.role === "ADMIN") {
          this.router.navigate(['admin'])
        } else {
          this.router.navigate([''])
        }
      }
    })
  }
}
