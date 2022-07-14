import { Store } from '@ngrx/store';
import { IPositions } from './../../interfaces/category';
import { Component, Input, OnInit } from '@angular/core';
import { setItem } from '../../store/cart.store';

@Component({
  selector: 'app-main-page-hits',
  templateUrl: './main-page-hits.component.html',
  styleUrls: ['./main-page-hits.component.scss']
})
export class MainPageHitsComponent implements OnInit {

  @Input()
  title!: string
  @Input()
  hits!: IPositions[]


  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  addToCart(obj: {img: string, name: string, price: number}) {
    this.store.dispatch(setItem(obj))
  }

  getPrice(price: number, discount: number) {
    if(discount === 0) return price
    return price * (1 - discount / 100)
  }

}
