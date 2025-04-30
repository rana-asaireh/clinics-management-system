import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserTypeGuard } from './guards/user-type.guard';
import { SignupComponent } from './signup/signup.component';
import { PatientAppointmentListComponent } from './modules/patient/components/patient-appointment-list/patient-appointment-list.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canMatch: [UserTypeGuard],
    data: { expectedType: 'admin' }
  },
  {
    path: 'doctor',
    loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule),
    canMatch: [UserTypeGuard],
    data: { expectedType: 'doctor' }
  },
  {
    path: 'patient',
    loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule),
    canMatch: [UserTypeGuard],
    data: { expectedType: 'patient' }
  },
  {
    path: 'signup',
    component: SignupComponent
  },


  //للمسح
  {
    path:'patient/:id',
    loadChildren: () => import('../app/modules/patient/patient.module').then(m => m.PatientModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
