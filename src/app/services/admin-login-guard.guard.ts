import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin-services';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuardGuard implements CanActivateChild {
  constructor(private adminService: AdminService, private router: Router) {
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.adminService.currentAdmin !== null)
      return true;
    return this.router.createUrlTree(['/admin-login'])
  }

}
