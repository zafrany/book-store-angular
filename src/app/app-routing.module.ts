import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddBookComponent } from './components/admin-add-book/admin-add-book.component';
import { AdminEditRemoveBookComponent } from './components/admin-edit-remove-book/admin-edit-remove-book.component';
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
import { AdminLoginGuardGuard } from './services/admin-login-guard.guard';
import { CartLoginGuardGuard } from './services/cart-login-guard.guard';

const routes:Routes = [
  {path:'home', component: StorefrontDisplayComponent},
  {path:'register', component: SignupFormComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'products/:bookId', component: ProductComponent},
  {path: 'cart', component: CartComponent, canActivate: [CartLoginGuardGuard]},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'admin', component: AdminComponent, children:
    [
      {path: 'managment', component:AdminManagmentComponent},
      {path: 'admin-password-change', component: AdminPasswordChangeComponent},
      {path: 'add-rmove-book', component: AdminEditRemoveBookComponent},
      {path: 'add-book', component: AdminAddBookComponent},
    ],
    canActivateChild: [AdminLoginGuardGuard],
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
