import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',
    children: [
      {
        path: '', 
        loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: '', 
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: '', 
        canActivate: [AuthGuard],
        canDeactivate: [AuthGuard],
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
      },
      {path: '**', component: NotFoundComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
