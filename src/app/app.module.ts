import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDisplayCardComponent } from './components/book-display-card/book-display-card.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StorefrontDisplayComponent } from './components/storefront-display/storefront-display.component';


@NgModule({
  declarations: [
    AppComponent,
    BookDisplayCardComponent,
    HeaderComponent,
    FooterComponent,
    StorefrontDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
