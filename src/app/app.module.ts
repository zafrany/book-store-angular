import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDisplayCardComponent } from './components/book-display-card/book-display-card.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StorefrontDisplayComponent } from './components/storefront-display/storefront-display.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { AddToCartButtonComponent } from './components/add-to-cart-button/add-to-cart-button.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminManagmentComponent } from './components/admin-managment/admin-managment.component';
import { AdminPasswordChangeComponent } from './components/admin-password-change/admin-password-change.component';
import { AdminEditRemoveBookComponent } from './components/admin-edit-remove-book/admin-edit-remove-book.component';
import { AdminAddBookComponent } from './components/admin-add-book/admin-add-book.component';

@NgModule({
  declarations: [
    AppComponent,
    BookDisplayCardComponent,
    HeaderComponent,
    FooterComponent,
    StorefrontDisplayComponent,
    SignupFormComponent,
    PageNotFoundComponent,
    LoginPageComponent,
    CartComponent,
    ProductComponent,
    AddToCartButtonComponent,
    AdminComponent,
    AdminHeaderComponent,
    AdminLoginComponent,
    AdminManagmentComponent,
    AdminPasswordChangeComponent,
    AdminEditRemoveBookComponent,
    AdminAddBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
