import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../../shared/models/doctor.model';
import { AdminService } from '../../services/admin.service';
import { UserType } from '../../../shared/enum/users.enum';
import { Clinic } from '../../../shared/models/clinic.model';
import { ClinicService } from '../../../shared/services/clinic.service';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';


@Component({
  selector: 'app-add-doctor',
  standalone: false,
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss'
})
export class AddDoctorComponent implements OnInit{
  name:string='';
  email:string='';
  phone:string='';
  specification:string='';
  doctor!:Doctor;
  password!:string;
  type:UserType = UserType.doctor;
  success:string='';
  clinics!:Clinic[];
  error!:string;
  selectedClinicId!:number;
  userDoctor!:User;
  
  formGroup: FormGroup = this.initFormGroup();

  constructor(private adminService:AdminService, private clinicService:ClinicService, private userService: UserService){}

  ngOnInit(): void {
    this.clinicService.getClinics().subscribe(
      (data: Clinic[]) => {
        this.error = '';
        this.clinics = data;
      },
      (error: any) => {
        this.error = 'Failed to load clinics';
      }
    )
  }
  
  initFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      specification: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      selectClinic:new FormControl('', Validators.required)
    })
  }
  addDoctor():void{
    this.success='';
    this.error='';
    this.formGroup.markAllAsTouched();
    // if (this.formGroup.valid){}
    this.name=this.formGroup.controls['name']?.value;
    this.email=this.formGroup.controls['email']?.value;
    this.phone=this.formGroup.controls['phone']?.value;
    this.specification=this.formGroup.controls['specification']?.value;
    this.password=this.formGroup.controls['password']?.value;
    this.selectedClinicId=this.formGroup.controls['selectClinic']?.value;
    this.doctor={
      type:this.type,
      name:this.name,
      email:this.email,
      password:this.password,
      phone:this.phone,
      specification:this.specification,
      clinic_id:this.selectedClinicId
    }
    this.userDoctor={
      type:this.type,
      name:this.name,
      email:this.email,
      password:this.password
    }
    this.adminService.addDoctor(this.doctor).subscribe((data:any)=>{this.success='Added Sucessfully';this.formGroup.reset();}, (error:any)=>{this.error='Failed to add doctor. Try again later!'})
    this.userService.addUserDoctor(this.userDoctor).subscribe((data:any)=>{}, (error:any)=>{this.error='Failed to add doctor as a user. Try again later!'})
    //end here
  }
}
