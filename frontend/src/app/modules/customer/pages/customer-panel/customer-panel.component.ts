import { AuthService } from './../../../../services/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-panel',
  templateUrl: './customer-panel.component.html',
  styleUrls: ['./customer-panel.component.scss']
})
export class CustomerPanelComponent implements OnInit {

  userId = this.router.url.split('/')[2]
  userInfo$!: Observable<any>
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userInfo$ = this.http.get(`http://localhost:5000/customer/getinfo/${this.userId}`, {
      headers : {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }
  
  logout() {
    this.authService.logout()
  }

}
