import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SignupComponent } from './signup/signup.component';
import { PatientModule } from './modules/patient/patient.module';
 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    PatientModule
 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
