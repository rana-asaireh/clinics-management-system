import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewAppointmentListComponent } from './components/view-appointment-list/view-appointment-list.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { DoctorLayoutComponent } from './components/doctor-layout/doctor-layout.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorLayoutComponent,
    children: [
      { path: '', component: ProfileComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'appointments/:id', component: ViewAppointmentListComponent },
      { path: 'patients', component: PatientsListComponent },
      {
        path: 'appointment-details/:id',
        component: AppointmentDetailsComponent,
      },
      { path: 'patient-details', component: PatientDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
