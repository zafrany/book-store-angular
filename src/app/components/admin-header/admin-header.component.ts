import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUser } from 'src/app/models/admin-user.model';
import { AdminService } from 'src/app/services/admin-services';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService) { }

  currentAdmin : AdminUser|null = null;
  ngOnInit(): void {
    this.currentAdmin = this.adminService.currentAdmin;
  }

  homeNavigate() {
    this.router.navigate(['home']);
  }

  adminLogout() {
    this.adminService.adminLogout();
  }
}
