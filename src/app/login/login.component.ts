import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword: boolean = false;
  password:string='';
  email:string='';
  error:string='';
  formGroup: FormGroup = this.initFormGroup();

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.formGroup.get('email')?.valueChanges.subscribe(() => {
      if (this.error) {this.error = '';}
    });
  
    this.formGroup.get('password')?.valueChanges.subscribe(() => {
      if (this.error) {this.error = '';}
    });
  }
  
  initFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    
    this.formGroup.markAllAsTouched();
    this.password=this.formGroup.controls['password']?.value;
    this.email=this.formGroup.controls['email']?.value;

    const encodedPassword = encodeURIComponent(this.password);

    this.authService.login(this.email, encodedPassword ).subscribe(
      (user: any) => {
        if (user.type === 'admin') {
          this.router.navigate(['admin']);
        }  else if( user.type === 'doctor') {
          this.router.navigate(['doctor']);
        } else if( user.type === 'patient') {
          this.router.navigate(['patient']);
        }
      },
      (error: any) => {
       this.error= error.message;
      })
    };
}


