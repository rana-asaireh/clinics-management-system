import {  Component, OnInit } from '@angular/core';

import { PatientAuthService } from '../../services/patient-auth.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../../shared/models/patients.model';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';

;


@Component({
  selector: 'app-patient-profile',
  standalone: false,
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss'
})
export class PatientProfileComponent implements OnInit {

    patientProfileForm!: FormGroup;
    patientId:string | null= null;
    patientData: Patient | null = null;
    success: string = '';
    error!: string;
    
    isVisible: { [key: string]: boolean } = {
      password: false
  };
  inputType: { [key: string]: string } = {
      password: 'password'
  };

    constructor(private patientAuthService: PatientAuthService,
      private userService :UserService
    ) {}
     ngOnInit(): void {
      const userEmail = this.userService.getCurrentUser()?.email;
      if (userEmail) {
        this.userService.getPatientByEmail(userEmail).subscribe(
          (patients) => {
            if (patients && patients.length > 0) {
              
              this.patientId = patients[0].id;
              this.getPatientData ();
            }else{
              console.log('Patient data not found.');
            }
          },
          (error) => {
            console.error('Error getting patient data:', error);
          });

      }else{
        console.log('User email not found.');
      }
       this.patientProfileForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
        gender: new FormControl('', Validators.required),
        dob: new FormControl('', Validators.required),
        password: new FormControl('', Validators.minLength(6))
       });
     }
    
    // get patient data
    getPatientData(){
      if(this.patientId){
        this.patientAuthService.getPatientById(this.patientId).subscribe(
          (patientData) => {
            console.log('Patient data:', patientData); 
            this.patientData = patientData as Patient;
          
      
            this.patientProfileForm.patchValue({
              name: this.patientData?.name,
              email: this.patientData?.email,
              phone: this.patientData?.phone,
              gender: this.patientData?.gender,
              dob: this.patientData?.dob,
              password: this.patientData?.password 
            });
          },
          (error) => {
            console.error('Error getting patient data:', error);
          }
          
        );
      }
    }
     updateProfile() {
      this.success = '';
      this.error = '';
      if(this.patientProfileForm.valid && this.patientId && this.patientData){
        const updatedData={...this.patientData,...this.patientProfileForm.value,id : this.patientId};
        const newPassword = this.patientProfileForm.get('password')?.value;
        this.patientAuthService.updatePatient(updatedData).subscribe(
          (success) => {
            console.log('Patient profile updated successfully:', success);
            this.updateUserData(updatedData,newPassword);
            this.success = 'Patient profile updated successfully';
            
            this.getPatientData();
          },
          (error) => {
            console.error('Error updating patient profile:', error);
            this.error = 'Error updating patient profile';
          }
        );
      }else{
        this.patientProfileForm.markAllAsTouched();
        this.error = 'Please fill in all required fields.';
      }
     }
     updateUserData(patientData: Patient,newPassword: string ) {
      this.userService.getUserByEmail(patientData.email).subscribe(
        (users) => {
          if (users && users.length > 0) {
            const user = users[0];
            const updatedUserData: User = {
              ...user,
              name: patientData.name,
              email: patientData.email 
            };
            if (newPassword && newPassword !== user.password) { 
              updatedUserData.password = newPassword;
          }
            this.userService.updateUser(updatedUserData).subscribe(
              (userUpdateSuccess) => {
                console.log('User data updated successfully:', userUpdateSuccess);
              },
              (userUpdateError) => {
                console.error('Error updating user data:', userUpdateError);
                this.error = 'Error updating user data';
              }
            );
          } else {
            console.log('No matching user found for this patient email.');
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
    toggleVisibility(fieldName: string) {
      this.isVisible[fieldName] = !this.isVisible[fieldName];
      this.inputType[fieldName] = this.isVisible[fieldName] ? 'text' : 'password';
  }
}
