import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { setItem } from '../../store/cart.store';
import { Store } from '@ngrx/store';
import { IPositions } from '../../interfaces/category';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit, OnDestroy {

  catrgoryPizza$!: Observable<IPositions[]>
  catrgorySubscription!: Subscription
  isLoading: boolean = true

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.catrgoryPizza$ = this.http.get<IPositions[]>('http://localhost:5000/pages/category/pizza')
    this.catrgorySubscription = this.catrgoryPizza$.subscribe({
      next: () => {
        this.isLoading = false
      }
    })
  }

  ngOnDestroy(): void {
    this.catrgorySubscription.unsubscribe()
  }

  addToCart(obj: {img: string, name: string, price: number}) {
    this.store.dispatch(setItem(obj))
  }

  getPrice(price: number, discount: number) {
    if(discount === 0) return price
    return price * (1 - discount / 100)
  }
}
