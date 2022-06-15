import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-managment',
  templateUrl: './admin-managment.component.html',
  styleUrls: ['./admin-managment.component.scss']
})
export class AdminManagmentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  passwordChangePageNavigate() {
    this.router.navigate(['admin/admin-password-change/']);
  }

}
