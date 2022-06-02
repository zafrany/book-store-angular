import { EmailValidator } from "@angular/forms";
import { Cart } from "./cart.model";

export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  userName: string,
  cart: Cart,
}
