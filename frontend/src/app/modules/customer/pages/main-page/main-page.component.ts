import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { setItem } from '../../store/cart.store';
import { IPositions } from '../../interfaces/category';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  popular$!: Observable<IPositions[]>
  specialOffers$!: Observable<IPositions[]>
  mainImg$!: Observable<{url: string}[]>

  popularSubscription!: Subscription
  specialOffersSubscription!: Subscription
  isLoading: boolean = true


  constructor(
    private http: HttpClient,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.popular$ = this.http.get<IPositions[]>('http://localhost:5000/pages/categorypopular')
    this.specialOffers$ = this.http.get<IPositions[]>('http://localhost:5000/pages/categorydiscount')
    this.popularSubscription = this.popular$.subscribe({
      next: () => this.isLoading = false 
    })
    this.specialOffersSubscription = this.specialOffers$.subscribe({
      next: () => this.isLoading = false 
    })
    this.mainImg$ = this.http.get<{url: string}[]>('http://localhost:5000/pages/mainimgurls')

  } 

  ngOnDestroy(): void {
    this.popularSubscription.unsubscribe()
    this.specialOffersSubscription.unsubscribe()
  }


  addToCart(obj: {img: string, name: string, price: number}) {
    this.store.dispatch(setItem(obj))
  }

  getPrice(price: number, discount: number) {
    if(discount === 0) return price
    return price * (1 - discount / 100)
  }

}
