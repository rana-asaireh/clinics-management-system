import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientAppointmentListComponent } from './components/patient-appointment-list/patient-appointment-list.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';

const routes: Routes = [
  {
    path: '',
    component: PatientAppointmentListComponent
  },
  {
    path: 'appointment-list',
    component: PatientAppointmentListComponent
  },
  {
    path: 'appointment-details/:id',
    component: AppointmentDetailsComponent
  },

  {
    path: 'doctor-list',
    component: DoctorsListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
