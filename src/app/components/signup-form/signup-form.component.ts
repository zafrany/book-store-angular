import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users-services';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;
  userName!: AbstractControl|null;
  firstName!: AbstractControl|null;
  lastName!: AbstractControl|null;
  email!: AbstractControl|null;
  password!: AbstractControl|null;
  passwordRepeated!: AbstractControl|null;

  users: User[] = [];
  userExists: boolean = false;

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      bookPicLink: ['', [Validators.required]],

    },
    {
      validators: []
    }
    );

    this.userName = this.signupForm.get('userName');
    this.firstName = this.signupForm.get('firstName');
    this.lastName = this.signupForm.get('lastName');
    this.email = this.signupForm.get('email');
    this.password = this.signupForm.get('password');
    this.passwordRepeated = this.signupForm.get('repeatPassword');

    this.userService.userData.subscribe((users)=>{
      this.users = users;
    })
    this.users = this.userService.users;
  }

  onSubmitSubscribeForm() {
    this.userNameValidator(this.userName!);
    if(!this.userExists) {
      const user:User = {
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        email: this.email?.value,
        password: this.password?.value,
        userName: this.userName?.value,
        cart: {
          items: []
        }
      }
      this.userService.addUser(user);
      this.userService.setCurrentUser(user);
      this.router.navigate(['home/']);
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

  passwordMismatchMessage() {
    if(this.passwordRepeated?.errors?.['required']){
      return 'You must repeat the password.'
    }

    if(this.signupForm.errors?.['passwordMismatch']) {
      return 'The two passwords must be identical.';
    }

    return null;
  }

  userNameValidator(control: AbstractControl) {
    for(let user of this.users) {
      if(user.userName === control.value){
        this.userExists = true;
        return;
      }
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors|null {
    const invalid = control.value.indexOf(' ') !== -1 || !(/[0-9]/.test(control.value));
    return invalid? {'passInvalidChars' : control.value } : null;
  }

  passwordRepeatedValidator(control: AbstractControl): ValidationErrors|null{
    const password = control.get('password')?.value;
    const passwordRepeated = control.get('repeatPassword')?.value;
    return password !== passwordRepeated ? {'passwordMismatch': true} : null;
  }

  invalidNameMessage(nameField: AbstractControl| null) {
    const errors = nameField!.errors;
    if(errors?.['required']) {
      return "You must enter a first and last name.";
    }
    if(errors?.['minlength']) {
      return "first and last name must be at least 2 characthers long.";
    }
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

  invalidEmailMessage() {
    const errors = this.email!.errors;
    if(errors?.['required']) {
      return "You must provide an email address.";
    }
    if(errors?.['email']) {
      return "You must enter a valid email address.";
    }
   return null;
  }

  onUserNameInput() {
    this.userExists = false;
  }
}
