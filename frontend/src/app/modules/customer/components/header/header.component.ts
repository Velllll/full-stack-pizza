
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { cartAmountSelector } from '../../store/cart.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  menuIsOpen: boolean = false
  cartIsOpen: boolean = true
  currentUrlSubscription!: Subscription

  cartPositionAmount$!: Observable<number>

  constructor(
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.currentUrlSubscription = this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if(event instanceof NavigationStart) {
            if(event.url === '/cart') {
              this.cartIsOpen = false;
            } else {
              this.cartIsOpen = true;
            }
          }
        }
      );

    this.cartPositionAmount$ = this.store.select(cartAmountSelector)
  }

  ngOnDestroy(): void {
    this.currentUrlSubscription.unsubscribe()
  }

  goTohomePage() {
    this.router.navigate(['/'])
  }

  goToCart() {
    this.router.navigate(['cart'])
  }
}
