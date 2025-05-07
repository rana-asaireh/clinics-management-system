import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { ViewAppointmentListComponent } from './components/view-appointment-list/view-appointment-list.component';
import { DoctorLayoutComponent } from './components/doctor-layout/doctor-layout.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';

@NgModule({
  declarations: [
    ProfileComponent,
    AppointmentDetailsComponent,
    ViewAppointmentListComponent,
    DoctorLayoutComponent,
    PatientsListComponent,
    PatientDetailsComponent,
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class DoctorModule {}
