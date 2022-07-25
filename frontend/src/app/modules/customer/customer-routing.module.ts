import { CustomerAccessGuard } from './../../guards/customer-access.guard';
import { CustomerPanelComponent } from './pages/customer-panel/customer-panel.component';
import { CartComponent } from './pages/cart/cart.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent,
    children: [
      {path: 'home', component: MainPageComponent},
      {path: 'menu', component: MenuPageComponent},
      {path: 'about', component: AboutComponent},
      {path: 'delivery', component: DeliveryComponent},
      {path: 'cart', component: CartComponent},
      {path: 'settings',
        component: CustomerPanelComponent,
        canActivate: [CustomerAccessGuard],
        canDeactivate: [CustomerAccessGuard]
      },
      {path: '', redirectTo: 'home', pathMatch: 'full'},
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
