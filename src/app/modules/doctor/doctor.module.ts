import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { ViewAppointmentListComponent } from './components/view-appointment-list/view-appointment-list.component';
import { DoctorLayoutComponent } from './components/doctor-layout/doctor-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PatientDetailsComponent,
    PatientsListComponent,
    AppointmentDetailsComponent,
    ViewAppointmentListComponent,
    DoctorLayoutComponent,
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DoctorModule {}
