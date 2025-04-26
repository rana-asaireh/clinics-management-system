import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clinic } from '../../../shared/models/clinic.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-clinic',
  standalone: false,
  templateUrl: './add-clinic.component.html',
  styleUrl: './add-clinic.component.scss'
})
export class AddClinicComponent {
  name:string='';
  clinic!:Clinic;
  success:string='';
  formGroup: FormGroup = this.initFormGroup();

  constructor(private adminService:AdminService){}

  initFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }
  addClinic():void{
    this.success='';
    this.formGroup.markAllAsTouched();
    this.name=this.formGroup.controls['name']?.value;
    this.clinic={name:this.name}
    this.adminService.addClinic(this.clinic).subscribe((data:any)=>{this.success='Added Sucessfully';this.formGroup.reset();})
  }
}
