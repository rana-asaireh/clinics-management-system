import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PatientAuthService } from './services/patient-auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PatientRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: PatientAuthService, useClass: PatientAuthService }
  ]
})
export class PatientModule { }
