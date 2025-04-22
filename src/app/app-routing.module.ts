import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path:'admin',
    loadChildren:()=> import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'doctor',
    loadChildren:()=> import('./modules/doctor/doctor.module').then(m => m.DoctorModule)
  },
  {
    path:'patient',
    loadChildren:()=> import('./modules/patient/patient.module').then(m => m.PatientModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
