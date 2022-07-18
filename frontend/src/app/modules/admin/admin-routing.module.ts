import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {path: 'admin', component: MainComponent,
    children: [
      {path: '', redirectTo: 'products', pathMatch: 'full'},
      {path: "users", component: UsersComponent},
      {path: "products", component: ProductsComponent},
      {path: "products/:id", component: ProductDetailsComponent},
      {path: "product/add", component: AddProductComponent},
      {path: "**", redirectTo: '', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
