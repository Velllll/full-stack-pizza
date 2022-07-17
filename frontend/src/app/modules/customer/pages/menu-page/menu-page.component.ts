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
  catrgoryPizzaSubscription!: Subscription
  catrgoryDrinks$!: Observable<IPositions[]>
  catrgoryDrinksSubscription!: Subscription

  products$!: Observable<IPositions[]>

  isLoading: boolean = true

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.catrgoryPizza$ = this.http.get<IPositions[]>('http://localhost:5000/pages/category/pizza')
    this.catrgoryPizzaSubscription = this.catrgoryPizza$.subscribe({
      next: () => {
        this.isLoading = false
      }
    })

    this.catrgoryDrinks$ = this.http.get<IPositions[]>('http://localhost:5000/pages/category/drinks')
    this.catrgoryDrinksSubscription = this.catrgoryPizza$.subscribe({
      next: () => {
        this.isLoading = false
      }
    })


    this.products$ = this.http.get<IPositions[]>('http://localhost:5000/pages/category')

    
  }

  ngOnDestroy(): void {
    this.catrgoryPizzaSubscription.unsubscribe()
    this.catrgoryDrinksSubscription.unsubscribe()
  }


  getSortedByCategory(products: IPositions[]): {title: string, products: IPositions[]}[] {
    const titleProductsArray = [...new Set(products.map(p => p.title))]
    .map(title => {
      return {
        title,
        products: products.filter(product => product.title === title)
      }
    })
    return titleProductsArray
  }
}
