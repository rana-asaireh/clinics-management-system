import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { PatientAuthService } from '../../services/patient-auth.service';

@Component({
  selector: 'app-patient-book-appointments',
  standalone: false,
  templateUrl: './patient-book-appointments.component.html',
  styleUrl: './patient-book-appointments.component.scss'
})
export class PatientBookAppointmentsComponent implements OnInit {



appointmentForm!:FormGroup;
todayDate: string | undefined;
userId: string | null = null;
appointmentData: any;
appointmentId: string | null = null;
doctorNameFromUrl: string | null = null;
clinicNameFromUrl: string | null = null;
doctorIdFromUrl: string | null = null;

  
  
constructor(private appointmentService:AppointmentService,
  private userService:UserService,
  private route: ActivatedRoute ,
private patientAuthService:PatientAuthService) { }
ngOnInit(): void {
  this.appointmentForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    reason:new FormControl('', Validators.required),
    id: new FormControl(null),
    doctor_id: new FormControl(null)
  });
 
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  this.todayDate = `${year}-${month}-${day}`;
  
  this.route.queryParams.subscribe(params => {
    this.doctorNameFromUrl = params['doctorName'];
    this.clinicNameFromUrl = params['clinicName'];
    this.doctorIdFromUrl = params['doctorId']; 
    this.appointmentForm.patchValue({
      doctor_id: this.doctorIdFromUrl
    });
    console.log('Doctor Name from URL:', this.doctorNameFromUrl);
    console.log('Clinic Name from URL:', this.clinicNameFromUrl);
    console.log('Doctor ID from URL:', this.doctorIdFromUrl);
  });
   // Get the ID from the route parameters
   this.route.paramMap.subscribe(params => {
    this.appointmentId = params.get('id');
    if (this.appointmentId) {
      this.appointmentService.getAppointmentById(this.appointmentId).subscribe(
        (appointment) => {
          if (appointment) {
            this.populateFormForEdit(appointment);
          } else {
            alert('Could not find appointment with this ID.');
          }
        },
        (error) => {
          console.error('Error fetching appointment for edit:', error);
          alert('Error fetching appointment details.');
        }
      );
    }
  });
}

populateFormForEdit(appointment: any) {
  this.patientAuthService.getPatientById(appointment.patient_id).subscribe(
    (patient: any) => { 
      if (patient) {
        this.appointmentForm.patchValue({
          fullname: patient.name,
          email: patient.email,
          phone: patient.phone,
          date: appointment.date,
          time: this.formatTime(appointment.time),
          reason: appointment.appointment_details?.reason || '',
          id: appointment.id,
          doctor_id: appointment.doctor_id 
        });
      } else {
        alert('Could not find patient information for this appointment.');
      }
    },
    (error) => {
      console.error('Error fetching patient information for edit:', error);
      alert('Error fetching patient details.');
    }
  );
}
formatTime(time: any): string {
  
  return time;
}


  submitAppointment() {
    console.log("submitAppointment function called");
    this.appointmentForm.markAllAsTouched(); // Mark all controls as touched
    this.appointmentForm.updateValueAndValidity(); // Re-evaluate the validity of the form
    console.log("Value of this.appointmentForm.valid:", this.appointmentForm.valid);
    console.log("Form errors:", this.appointmentForm.errors);
    if (this.appointmentForm.valid) {
      const appointmentData = this.appointmentForm.value;
      const email = appointmentData.email;
      this.userService.getPatientByEmail(email).subscribe(
        (patients) => {
          if (patients && patients.length > 0) {
            const patient = patients[0];
            const appointmentToSend = {
              date: appointmentData.date,
              patient_id: patient.id,
              doctor_id: appointmentData.doctor_id,
              approval_status: "",
              appointment_details: {
                reason: appointmentData.reason,
                drugs: "",
                diagnosis: "",
              
              },
                payment: "",
              time : appointmentData.time,
            };
            console.log("Appointment Data To Send:", appointmentToSend);
            if (this.appointmentId) {
              this.appointmentService.updateAppointment(this.appointmentId, appointmentToSend).subscribe(
                (response: any) => {
                  console.log('Appointment updated successfully:', response);
                  alert('Appointment updated successfully');
                  this.appointmentForm.reset();
                },
                (error) => {
                  console.error('Error updating appointment:', error);
                  alert('Failed to update appointment. Please try again.');
                }
              );
            } else {
              this.appointmentService.addAppointment(appointmentToSend).subscribe(
                (response: any) => {
                  console.log('Appointment booked successfully:', response);
                  alert('Appointment booked successfully');
                  this.appointmentForm.reset();
                },
                (error) => {
                  console.error('Error booking appointment:', error);
                  alert('Failed to book appointment. Please try again.');
                }
              );
            }
          } else {
            console.error('Could not find patient with this email.');
            alert('Could not find patient with this email. Please try again.');
          }
        },
        (error) => {
          console.error('Error fetching patient information:', error);
          alert('Error fetching patient information. Please try again.');
        }
      );
    } else {
      console.error('Form is invalid:', this.appointmentForm.errors);
      alert('Please fill in all the required fields correctly.');
    }
  }

}









