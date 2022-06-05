import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users-services';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  userName!: AbstractControl|null;
  password!: AbstractControl|null;
  loginFailed: boolean = false;

  users: User[] = [];
  constructor(private fb: FormBuilder, private userService: UsersService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]]
    }
    );

    this.userName = this.loginForm.get('userName');
    this.password = this.loginForm.get('password');

    this.userService.userData.subscribe((users)=>{
      this.users = users;
    })
    this.users = this.userService.users;
  }

  onSubmitLoginForm() {
    for(let user of this.users){
      if(user.userName === this.userName?.value){
        if(user.password === this.password?.value){
          console.log("login succesfull with username: " + user.userName);
          this.userService.setCurrentUser(user);
          this.router.navigate(['/home']);
          return;
        }
      }
      this.loginFailed = true;
      this.loginForm.controls['password'].setValue("");
      this.loginForm.controls['userName'].setValue("");
      console.log("login failed!");
    }
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
