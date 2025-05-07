import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { UserService } from '../../../shared/services/user.service';
import { Doctor } from '../../../shared/models/doctor.model';

import { User } from '../../../shared/models/user.model';
import { ClinicService } from '../../../shared/services/clinic.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileForm !: FormGroup;
  doctorId:string | null= null;
  doctorFormData: Doctor | null = null;
  constructor(private doctorService: DoctorService,
    private userService:UserService,
    private clinicsService:ClinicService
  ) { }
ngOnInit(): void {
  const doctorEmail =this.userService.getCurrentUser()?.email; 
  console.log('Current user email:', doctorEmail); 
  if(doctorEmail){
    this.userService.getDoctorByEmail(doctorEmail).subscribe(
      (doctors)=>{
        if(doctors && doctors.length>0){
          this.doctorId=doctors[0].id;
          this.getDoctorData();
        }else{
          console.log('Doctor data not found.');
        }
      },
      (errors)=>{
        console.error('Error getting doctor data:', errors);
      }
    );
  }else{
    console.log('User email not found.');
  }
  this.profileForm =new FormGroup({
    name:new FormControl('', Validators.required),
    specifications:new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    phone:new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
    gender:new FormControl('', Validators.required),
    clinicName:new FormControl({ value: '', disabled: true }, Validators.required),
  });
}
getDoctorData(){
  console.log('Attempting to get doctor with ID:', this.doctorId);
  if(this.doctorId){
          this.doctorService.getDoctorsById(this.doctorId).subscribe(
            (doctorFormData) => {
              console.log('Doctor data received:', doctorFormData);
              this.doctorFormData = doctorFormData as Doctor;
              console.log('Doctor data:', this.doctorFormData); 
              this.doctorFormData = this.doctorFormData as Doctor;
              this.profileForm.patchValue({
                name: this.doctorFormData?.name,
                email: this.doctorFormData?.email,
                phone: this.doctorFormData?.phone,
                gender: this.doctorFormData?.gender,
                specifications: this.doctorFormData?.specification,
                clinicName: this.doctorFormData?.clinic_id,
              });
              if (this.doctorFormData?.clinic_id) {
                this.clinicsService.getClinicNameById(this.doctorFormData.clinic_id).subscribe(
                  (clinicName) => {
                    this.profileForm.patchValue({ clinicName: clinicName }); 
                  },
                  (error) => {
                    console.error('Error getting clinic name:', error);
                    this.profileForm.patchValue({ clinicName: 'not found' }); 
                  }
                );
              }
            },
            (error) => {
              console.error('Error getting doctor data:', error);
            }
            
          );
        }
}

onSubmit() {
  if(this.profileForm.valid && this.doctorId && this.doctorFormData){
    const updatedData={...this.doctorFormData,...this.profileForm.value,id : this.doctorId};
    this.doctorService.updateDoctor(updatedData).subscribe(
      (success) => {
        console.log('Doctor profile updated successfully:', success);
        this.updateUserDataForDoctor(updatedData);
        alert('Doctor profile updated successfully');
        this.getDoctorData();
      },
      (error) => {
        console.error('Error updating doctor profile:', error);
        alert('Error updating doctor profile');
      }
    );
  }else{
    this.profileForm.markAllAsTouched();
    alert('Please fill in all required fields.');
  }
 }
 updateUserDataForDoctor(doctorData: Doctor) {
  this.userService.getUserByEmail(doctorData.email).subscribe(
    (users) => {
      if (users && users.length > 0) {
        const user = users[0];
        const updatedUserData: User = {
          ...user,
          name: doctorData.name,
          email: doctorData.email // تأكد من تحديث البريد الإلكتروني إذا لزم الأمر
        };
        this.userService.updateUser(updatedUserData).subscribe(
          (userUpdateSuccess) => {
            console.log('User data updated successfully for doctor:', userUpdateSuccess);
          },
          (userUpdateError) => {
            console.error('Error updating user data for doctor:', userUpdateError);
            alert('Error updating user data for doctor');
          }
        );
      } else {
        console.log('No matching user found for this doctor email.');
      }
    },
    (error) => {
      console.error('Error fetching user data for doctor:', error);
    }
  );
}

  
}


