import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { StorefrontDisplayComponent } from './components/storefront-display/storefront-display.component';

const routes:Routes = [
  {path:'home', component: StorefrontDisplayComponent},
  {path:'register', component: SignupFormComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
