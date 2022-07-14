import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AboutComponent } from './pages/about/about.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { CartComponent } from './pages/cart/cart.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../../../environments/environment';
import { reducers } from './store';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { CategoryComponent } from './components/category/category.component';
import { MainPageHitsComponent } from './components/main-page-hits/main-page-hits.component';

@NgModule({
  declarations: [
    MainPageComponent,
    MenuPageComponent,
    LoaderComponent,
    AboutComponent,
    DeliveryComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ModalWindowComponent,
    CategoryComponent,
    MainPageHitsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    FormsModule
  ]
})
export class CustomerModule { }
