import { AuthService } from 'src/app/services/auth.service';
import { IUser } from './../../interfaces/userInterface';
import { filter, map, Observable, tap, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users$!: Observable<IUser[]>
  userDelete$?: Observable<IUser>
  userSubscription?: Subscription
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.users$ = this.http.get<IUser[]>("http://localhost:5000/admin/users", {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe()
  }

  deleteUser(id: number) {
    console.log(id)
    this.userDelete$ = this.http.delete<IUser>("http://localhost:5000/admin/user/" + id, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
    this.userSubscription = this.userDelete$.subscribe({
      next: data => {
        console.log(data)
        this.users$ = this.users$.pipe(
          filter(user => user[0].id_user !== id)
        )
      },
    })
  }
}
