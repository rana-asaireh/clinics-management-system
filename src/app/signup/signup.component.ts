import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PatientAuthService } from '../modules/patient/services/patient-auth.service';
import Swal from 'sweetalert2';
import { UserService } from '../modules/shared/services/user.service';

import { UserType } from '../modules/shared/enum/users.enum';
import { User } from '../modules/shared/models/user.model';
import { Patient } from '../modules/shared/models/patient.model';



@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  //#region Variable Decl.
  //Flags
  isVisible = {
    password: false,
    confirmPassword: false
  };
  isConfirmPasswordVisible: boolean = false;

  //states
  passwordIconPath: string = ''
  inputType = {
    password: 'password',
    confirmPassword: 'password'
  };
  showPasswordRules: boolean = false;
  errors: string[] = [];




  passwordRules = {
    lowerCase: false,
    upperCase: false,
    digit: false,
    specialChar: false,
    minLength: false
  };


  constructor(private patientService: PatientAuthService,
    private userService: UserService
  ) {

  }




  checkPasswordStrength(password: string): void {
    this.passwordRules.lowerCase = /[a-z]/.test(password);
    this.passwordRules.upperCase = /[A-Z]/.test(password);
    this.passwordRules.digit = /[0-9]/.test(password);
    this.passwordRules.specialChar = /[^A-Za-z0-9]/.test(password);
    this.passwordRules.minLength = password.length >= 8;
  }



  //#region  Reactive Form  
  formNameMapping: { [key: string]: string } = {
    username: 'Username',
    email: 'Email',
    phone: 'Phone number',
    gender: 'Gender',
    password: 'Password',
    dob: 'Date Of Birthday',
    confirmPassword: 'Confirm Password',
    termsMsg: 'I agree to the terms and conditions',
    terms: 'Agreemnent the requirement'
  }
  registrationForm: FormGroup = this.initializeForm();
  initializeForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', [Validators.required, this.noFutureDateValidator]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
      confirmPassword: new FormControl('', Validators.required),
      terms: new FormControl('', Validators.required)
    })
  }

  //check if dob is future date
  noFutureDateValidator(control: AbstractControl): any {
    const today = new Date();
    const inputDate = new Date(control.value);
    return inputDate > today ? { futureDate: true } : null;
  }


  //#region Password visiblity 
  toggleVisibility(field: 'password' | 'confirmPassword'): void {
    this.isVisible[field] = !this.isVisible[field];
    this.inputType[field] = this.isVisible[field] ? 'text' : 'password';
  }



  //#region submit 

  checkValidity(): void {
    this.registrationForm.markAllAsTouched();
    this.errors.length = 0;
    if (this.registrationForm.controls['password'].value && this.registrationForm.controls['confirmPassword'].value) {
      if (this.registrationForm.controls['password'].value != this.registrationForm.controls['confirmPassword'].value)
        this.errors.push("Password and Confirm Password do not match.");

    }
  
    if(this.registrationForm.valid) {

      //the fields all  are true 

      /*check email if exist*/
      this.patientService.checkEmailExist(this.registrationForm.controls['email'].value).subscribe(
        (exist) => {
          //using library sweetalert2 to alert the message
          if (exist) { //email exist => back you to signup page
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email already exists!',
            });
          }
          else { //email not exist =>add patient to patientslist && usersList
            const { password: formPassword, confirmPassword, terms, ...newPatient }: any = this.registrationForm.value;

            this.patientService.addPatient(newPatient).subscribe(
              (patients) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Successful submitted...',
                  text: 'You Registered successfully',
                });
                this.registrationForm.reset();
                console.log('patients List', patients)
              }
            )

            //destructing a name,email,password
            const { username, email, password } = this.registrationForm.value;
            const newUser: User = {
              type: UserType.patient,
              name: username,
              email: email,
              password: password,


            }
            this.userService.addUser(newUser).subscribe(
              (users) => {

                console.log('users List', users)
              }
            )
          }


        }
      )


    }
  }



}


