import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../../../services/auth.service';
import { Observable } from 'rxjs';
import { IPositions } from './../../../customer/interfaces/category';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product$!: Observable<IPositions[]>
  productId!: string
  errName = false
  infoForm!: FormGroup

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.infoForm = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      img: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      discription: new FormControl('', [
        Validators.required
      ]),
      price: new FormControl('', [
        Validators.required
      ]),
      discount: new FormControl('', [
        Validators.required
      ]),
    })
   this.productId = this.router.url.split('/')[3]
   this.product$ = this.http.get<IPositions[]>('http://localhost:5000/admin/products/' + this.productId, {
    headers: {"Authorization": "Bearer " + this.authService.getToken()}
   })
   this.product$.subscribe({
    next: (data) => {
      const {title, img, name, discription, price, discount} = data[0]
      this.infoForm.setValue({title, img, name, discription, price, discount})
    }
   })
 
  }

  ngOnDestroy(): void {
    
  }



  updateProduct() {
    this.http.put<IPositions[]>('http://localhost:5000/admin/products/' + this.productId, 
    {...this.infoForm.value, category_id: this.productId},
    {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
    .subscribe({
      next: data => {
        this.errName = true
        console.log(data)
      }
    })
  
  }
  
}
