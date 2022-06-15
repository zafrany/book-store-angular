import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminUser } from 'src/app/models/admin-user.model';
import { AdminService } from 'src/app/services/admin-services';

@Component({
  selector: 'app-admin-password-change',
  templateUrl: './admin-password-change.component.html',
  styleUrls: ['./admin-password-change.component.scss']
})
export class AdminPasswordChangeComponent implements OnInit {
  passwordChangeForm!: FormGroup;
  currentPassword!: AbstractControl|null;
  password!: AbstractControl|null;
  passwordRepeated!: AbstractControl|null;
  currentAdmin!: AdminUser|null;
  currentPasswordMismatch: boolean = false;
  changeSuccess: boolean = false;
  newPasswordEqualsCurrent : boolean = false;

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.passwordChangeForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    },
    {
      validators: [this.passwordRepeatedValidator]
    }
    );

    this.currentPassword = this.passwordChangeForm.get('currentPassword');
    this.password = this.passwordChangeForm.get('password');
    this.passwordRepeated = this.passwordChangeForm.get('repeatPassword');

    this.adminService.currentAdminUserData.subscribe((currentAdmin)=>{
      this.currentAdmin = currentAdmin;
    })
    this.currentAdmin = this.adminService.currentAdmin;
  }

  passwordRepeatedValidator(control: AbstractControl): ValidationErrors|null{
    const password = control.get('password')?.value;
    const passwordRepeated = control.get('repeatPassword')?.value;
    return password !== passwordRepeated ? {'passwordMismatch': true} : null;
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

    if(this.passwordChangeForm.errors?.['passwordMismatch']) {
      return 'The two passwords must be identical.';
    }

    return null;
  }

  navigateToManagment(router: Router) {
    setTimeout(function () {
      router.navigate(['admin/managment']);
    }, 2000);
  }

  onSubmitPasswordChangeForm() {
    this.currentPasswordMismatch = false;
    this.newPasswordEqualsCurrent = false;
    if(this.currentAdmin?.password !== this.currentPassword?.value){
      this.currentPasswordMismatch = true;
      return;
    }
    if(this.currentAdmin?.password === this.password?.value){
      this.newPasswordEqualsCurrent = true;
      return;
    }
    this.currentAdmin!.password = this.password?.value;
    this.changeSuccess = true;
    this.navigateToManagment(this.router);
  }
}
