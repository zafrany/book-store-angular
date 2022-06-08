import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CartComponent } from "../components/cart/cart.component";
import { Book } from "../models/book.model";
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
          {
            item: {
              bookId : 2,
              bookName: 'book2',
              bookPictureLink: '../assets/images/book-covers/SH_Vol_2.png',
            },
            quantity: 3
          },
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
}
