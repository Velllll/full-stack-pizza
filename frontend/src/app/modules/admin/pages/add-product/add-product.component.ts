import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IPositions } from './../../../customer/interfaces/category';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

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
  }

  addProduct() {
    this.http.post("http://localhost:5000/admin/products", this.infoForm.value, 
      {headers : {"Authorization": "Bearer " + this.authService.getToken()}}
    )
  }
}
