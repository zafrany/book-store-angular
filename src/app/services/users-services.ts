import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
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
        items: []
      },
    }
  ]

  private _userSubject = new Subject<User[]> ();
  userData = this._userSubject.asObservable();

  get users() {
    return [...this._users];
  }

  addUser(user: User){
    this._users.push(user);
    this._userSubject.next([...this._users]);
  }
}
