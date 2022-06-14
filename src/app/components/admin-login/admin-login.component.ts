import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin-services';
import { AdminUser } from 'src/app/models/admin-user.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  userName!: AbstractControl|null;
  password!: AbstractControl|null;
  loginFailed: boolean = false;

  admins: AdminUser[] = [];
  constructor(private fb: FormBuilder, private adminService: AdminService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]]
    }
    );

    this.adminService.adminData.subscribe((admins)=>{
      this.admins = admins;
    })
    this.admins = this.adminService.admins;
  }

  onSubmitLoginForm() {
    this.userName = this.loginForm.get('userName');
    this.password = this.loginForm.get('password');

    for(let admin of this.admins){
      if(admin.userName === this.userName?.value){
        if(admin.password === this.password?.value){
          console.log("login succesfull with username: " + admin.userName);
          this.adminService.setCurrentAdminUser(admin);
          this.router.navigate(['/admin/managment']);
          return;
        }
      }
    }
    this.loginFailed = true;
    this.loginForm.controls['password'].setValue("");
    this.loginForm.controls['userName'].setValue("");
    console.log("login failed!");
  }

  invalidPasswordMessage() {
    const errors = this.password?.errors;
    if(errors?.['required'])
      return "You must enter a password.";

    if(errors?.['passInvalidChars'])
      return "Password cannot contain space and must contain at least 1 digit.";
    return null;
  }

  invalidUserNameMessage() {
    const errors = this.userName!.errors;
    if(errors?.['required']) {
      return "You must enter a user name.";
    }
    if(errors?.['minlength']) {
      return "User name have to be at least 4 characthers long.";
    }
    return null;
  }

  onPasswordInput(){
    this.loginFailed = false;
  }
}
