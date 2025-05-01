import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Diagnosis } from '../../../shared/models/diagnosis.model';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-add-diagnosis',
  standalone: false,
  templateUrl: './add-diagnosis.component.html',
  styleUrl: './add-diagnosis.component.scss'
})
export class AddDiagnosisComponent {
  name:string='';
  diagnosis!:Diagnosis;
  success:string='';
  formGroup: FormGroup = this.initFormGroup();

  constructor(private adminService:AdminService){}

  initFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }
  addDiagnosis():void{
    this.success='';
    this.formGroup.markAllAsTouched();
    this.name=this.formGroup.controls['name']?.value;
    this.diagnosis={name:this.name}
    this.adminService.addDiagnosis(this.diagnosis).subscribe((data:any)=>{this.success='Added Sucessfully';this.formGroup.reset();})
  }
}
