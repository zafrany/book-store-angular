import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AdminUser } from "../models/admin-user.model";

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private _admins: AdminUser[] = [
    {
      password: 'admin',
      userName: 'admin',
    }
  ]

  private _currentAdmin: AdminUser|null = null;

  private _currentAdminSubject = new Subject<AdminUser|null> ();
  currentAdminUserData = this._currentAdminSubject.asObservable();

  private _adminSubject = new Subject<AdminUser[]> ();
  adminData = this._adminSubject.asObservable();

  get admins() {
    return [...this._admins];
  }

  get currentAdmin() {
    return this._currentAdmin;
  }

  setCurrentAdminUser(admin: AdminUser){
    this._currentAdmin = admin;
    this._currentAdminSubject.next(this._currentAdmin);
  }

  adminLogout(){
    this._currentAdmin = null;
    this._currentAdminSubject.next(this._currentAdmin);
  }
}
