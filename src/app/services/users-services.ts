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

  addToCart(book: Book, quantity: number){
      if(this._currentUser !== null)
      {
        let result : CartItem|undefined;
        result = this._currentUser.cart.items.find(item => item.item === book);
        if(result !== undefined)
          result.quantity++;

        else {
          this._currentUser.cart.items.push(
            {
              item: book,
              quantity : quantity,
            }
          )
        }
        this._userSubject.next([...this._users]);
        return;
      }
  }

  changeItemQuantity(cartItem: CartItem, quantity: number){
    let result : CartItem|undefined;
    if(this._currentUser !== null){
      result = this._currentUser.cart.items.find(item => item === cartItem);
        if (result !== undefined){
          result.quantity = quantity;
        }
        this._currentUser.cart.items = this._currentUser.cart.items.filter(item => item.quantity > 0);
    }
    return;
  }
}
