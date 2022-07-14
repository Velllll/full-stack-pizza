import { Router } from '@angular/router';
import { cartSelector, deleteAllItem, deleteItem, setItem } from './../../store/cart.store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICart } from '../../interfaces/category';
import { Observable, Subscription } from 'rxjs';

export interface ISortedCart extends ICart {
  amount: number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  
  cartItems$!: Observable<ICart[]>;
  cartItemsSubscription!: Subscription;
  sortedCartItems!: ISortedCart[];
  checkoutIsOpen: boolean = false;
  payment: boolean = false

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartItems$ = this.store.select(cartSelector)
    this.cartItemsSubscription = this.cartItems$.subscribe({
      next: (items) => {this.sortedCartItems = this.sortCartItems(items)},
    })
  }


  sortCartItems(itemArray: ICart[]): ISortedCart[] {
    let itemsWithAmount = itemArray
      .map(item => {
        const amount = itemArray.filter(i => i.name === item.name )
        return {...item, amount: amount.length}
      })
      .filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.amount === value.amount &&
          t.name === value.name &&
          t.img === value.img &&
          t.price === value.price
        ))
      )

    return itemsWithAmount
  }

  get totalPrice(): string {
    return this.sortedCartItems.reduce((s, i) => s += (i.price * i.amount) , 0).toFixed(2)
  }


  ngOnDestroy(): void {
    this.cartItemsSubscription.unsubscribe()
  }

  increaseAmount(name: string, img: string, price: number) {
    const index = this.sortedCartItems.findIndex(i => i.name === name)
    this.sortedCartItems[index].amount++
    this.store.dispatch(setItem({img, name, price}))
  }

  decreaseAmount(name: string) {
    const index = this.sortedCartItems.findIndex(i => i.name === name)
    if(this.sortedCartItems[index].amount > 1) {
      this.sortedCartItems[index].amount--
      
    }
    this.store.dispatch(deleteItem({name}))
  }

  checkOut() {
    this.checkoutIsOpen = true
  }

  closeModal() {
    this.checkoutIsOpen = false
    this.payment = false
  }

  confirm() {
    this.closeModal()
    this.store.dispatch(deleteAllItem())
    this.router.navigate(['/'])
  }
}
