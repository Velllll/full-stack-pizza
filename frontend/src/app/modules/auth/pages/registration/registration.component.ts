import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  
  registrationForm!: FormGroup
  response$!: Observable<{message: string}>
  errDuplicate: boolean = false
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'email': new FormControl('user@user.com', [
        Validators.required,
        Validators.email,
      ]),
      'password': new FormControl('user1234', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ]),
    })

    console.log()
  }

  submitRegistration() {
    this.response$ = this.http.post<{message: string}>('http://localhost:5000/auth/registration', this.registrationForm.value)
    this.response$.subscribe({
      next: (r => {
        console.log(r)
        if(r.message.split(' ')[0] === "Duplicate") {
          this.errDuplicate = true
        } else {
          this.router.navigate(['/login'])
        }
      }),
      error: (err) => console.log(err.message)
    })
  }

  
}
