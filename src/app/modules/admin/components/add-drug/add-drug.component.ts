import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Drug } from '../../../shared/models/drug.model';
import { AdminService } from '../../services/admin.service';



@Component({
  selector: 'app-add-drug',
  standalone: false,
  templateUrl: './add-drug.component.html',
  styleUrl: './add-drug.component.scss'
})
export class AddDrugComponent {
  name:string='';
  drug!:Drug;
  success:string='';
  formGroup: FormGroup = this.initFormGroup();
  constructor(private adminService:AdminService){}
  initFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }
  addDrug():void{
    this.success='';
    this.formGroup.markAllAsTouched();
    this.name=this.formGroup.controls['name']?.value;
    this.drug={name:this.name}
    this.adminService.addDrug(this.drug).subscribe((data:any)=>{this.success='Added Sucessfully';this.formGroup.reset();})
  }
}
