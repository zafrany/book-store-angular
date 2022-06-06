import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDisplayCardComponent } from './components/book-display-card/book-display-card.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductComponent } from './components/product/product.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { StorefrontDisplayComponent } from './components/storefront-display/storefront-display.component';

const routes:Routes = [
  {path:'home', component: StorefrontDisplayComponent},
  {path:'register', component: SignupFormComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'products/:bookId', component: ProductComponent},
  {path: 'cart', component: CartComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
