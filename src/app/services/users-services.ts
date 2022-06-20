import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Book } from "../models/book.model";
import { CartItem } from "../models/cart-item.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private _users: User[] = [
    {
      firstName: 'moshe',
      lastName: 'moshiko',
      email: 'mosh@gmail.com',
      password: '123moshe',
      userName: 'moshe',
      cart: {
        items: [
        ]
      },
    }
  ]

  private _currentUser: User|null = null;

  private _currentUserSubject = new Subject<User|null> ();
  currentUserData = this._currentUserSubject.asObservable();

  private _userSubject = new Subject<User[]> ();
  userData = this._userSubject.asObservable();

  get users() {
    return [...this._users];
  }

  get currentUser() {
    return this._currentUser;
  }

  setCurrentUser(user: User){
    this._currentUser = user;
    this._currentUserSubject.next(this._currentUser);
  }

  addUser(user: User){
    this._users.push(user);
    this._userSubject.next([...this._users]);
  }

  logoutUser(){
    this._currentUser = null;
    this._currentUserSubject.next(this._currentUser);
  }

  addToCart(book: Book, quantity: number, currentUser: User){
    for(let user of this._users){
      if(user === currentUser)
      {
        for(let cartItem of user.cart.items)
        {

          if(cartItem.item.bookId === book.bookId){
            cartItem.quantity++;
            return;
          }
        }
        user.cart.items.push(
          {
            item: book,
            quantity : quantity,
          }
        )
        this._userSubject.next([...this._users]);
        return;
      }
    }
  }

  changeItemQuantity(cartItem: CartItem, quantity: number){
    let newCart : CartItem [] = [];
    for(let user of this._users){
      if(user === this._currentUser){
        for(let loopCartItem of user.cart.items){
          if (loopCartItem === cartItem){
            loopCartItem.quantity = quantity;
          }

          if(loopCartItem.quantity !== 0)
            newCart.push(loopCartItem);
        }
      }
      user.cart.items = newCart;
      return;
    }
  }
}
