import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PatientAuthService } from './services/patient-auth.service';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { PatientAppointmentListComponent } from './components/patient-appointment-list/patient-appointment-list.component';
import { PatientBookAppointmentsComponent } from './components/patient-book-appointments/patient-book-appointments.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DoctorsListComponent,
    PatientAppointmentListComponent,
    PatientBookAppointmentsComponent,
    PatientProfileComponent,
    AppointmentDetailsComponent,

  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: PatientAuthService, useClass: PatientAuthService }
  ]
})
export class PatientModule { }
