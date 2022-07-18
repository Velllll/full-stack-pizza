import { Router } from '@angular/router';
import { IProducts } from './../../interfaces/productsInterface';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsResponse$!: Observable<IProducts[]>

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.productsResponse$ = this.http.get<IProducts[]>('http://localhost:5000/admin/products', {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  getSortedByCategory(products: IProducts[]): {title: string, products: IProducts[]}[] {
    const titleProductsArray = [...new Set(products.map(p => p.title))]
    .map(title => {
      return {
        title,
        products: products.filter(product => product.title === title)
      }
    })
    return titleProductsArray
  }

  getPrice(price: number, discount: number) {
    if(discount === 0) return price
    return price * (1 - discount / 100)
  }

  editProduct(id: number) {
    this.router.navigate(['admin/products/' + id])
  }

  addProduct() {
    this.router.navigate(['admin/product/add'])
  }

}
