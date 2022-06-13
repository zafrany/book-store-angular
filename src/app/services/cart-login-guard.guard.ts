import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users-services';

@Injectable({
  providedIn: 'root'
})
export class CartLoginGuardGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.currentUser !== null)
      return true;
    return this.router.createUrlTree(['/login'])
  }

}
