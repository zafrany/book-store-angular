import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminManagmentComponent } from './components/admin-managment/admin-managment.component';
import { AdminPasswordChangeComponent } from './components/admin-password-change/admin-password-change.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductComponent } from './components/product/product.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { StorefrontDisplayComponent } from './components/storefront-display/storefront-display.component';
import { CartLoginGuardGuard } from './services/cart-login-guard.guard';

const routes:Routes = [
  {path:'home', component: StorefrontDisplayComponent},
  {path:'register', component: SignupFormComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'products/:bookId', component: ProductComponent},
  {path: 'cart', component: CartComponent, canActivate: [CartLoginGuardGuard]},
  {path: 'admin', component: AdminComponent, children:
    [
      {path: '', component:AdminLoginComponent},
      {path: 'managment', component:AdminManagmentComponent},
      {path: 'admin-password-change', component: AdminPasswordChangeComponent},
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
