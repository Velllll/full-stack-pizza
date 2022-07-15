import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
