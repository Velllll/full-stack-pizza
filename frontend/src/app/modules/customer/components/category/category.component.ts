import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPositions } from '../../interfaces/category';
import { setItem } from '../../store/cart.store';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input()
  catrgorys!: {title: string, products: IPositions[]}[]

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  getPrice(price: number, discount: number) {
    if(discount === 0) return price
    return price * (1 - discount / 100)
  }

  addToCart(obj: {img: string, name: string, price: number}) {
    this.store.dispatch(setItem(obj))
  }

}
