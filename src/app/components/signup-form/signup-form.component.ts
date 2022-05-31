import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;
  userName!: AbstractControl|null;
  firstName!: AbstractControl|null;
  email!: AbstractControl|null;
  password!: AbstractControl|null;
  passwordRepeated!: AbstractControl|null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      repeatPassword: ['', [Validators.required]],
    },
    {
      validators: [this.passwordRepeatedValidator]
    }
    );

    this.firstName = this.signupForm.get('firstName');
    this.email = this.signupForm.get('email');
    this.password = this.signupForm.get('password');
    this.passwordRepeated = this.signupForm.value.repeatPassword;
  }

  invalidPasswordMessage() {
    console.log("inside invalid pass");
    const errors = this.password?.errors;
    if(errors?.['required'])
      return "You must enter a password";

    if(errors?.['passInvalidChars'])
      return "password cannot contain space and must contain at least 1 digit";
    return null;
  }

  passwordMismatchMessage() {
    if(this.passwordRepeated?.errors?.['required']){
      return 'You must repeat the password'
    }

    if(this.signupForm.errors?.['passwordMismatch']) {
      return 'Two passwords must be identical';
    }

    return null;
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

invalidFirstNameMessage() {
    const errors = this.firstName!.errors;
    if(errors?.['required']) {
      return "You must enter a first name";
    }
    if(errors?.['minlength']) {
      return "first name must be at least 2 characthers";
    }
   return null;
  }
}
