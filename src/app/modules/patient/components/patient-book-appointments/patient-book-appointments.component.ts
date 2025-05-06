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
    id: new FormControl(null)
  });
 // Prevent selecting past dates for appointments.
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  this.todayDate = `${year}-${month}-${day}`;

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
    (patient: any) => { // تأكد من أن نوع patient صحيح
      if (patient) {
        this.appointmentForm.patchValue({
          fullname: patient.name,
          email: patient.email,
          phone: patient.phone,
          date: appointment.date,
          time: this.formatTime(appointment.time),
          reason: appointment.appointment_details?.reason || '',
          id: appointment.id,
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
  // ... تنفيذ تنسيق الوقت
  return time;
}
  //  this.route.params.pipe(
  //   switchMap(params => {
  //     this.appointmentId = params['id'];
  //     if (this.appointmentId) {
  //       return this.appointmentService.getAppointmentById(this.appointmentId); // Assuming you have this service method
  //     }
  //     return of(null); // If no ID, return a null observable
  //   })
  // ).subscribe(appointment => {
  //   if (appointment) {
      // Populate the form with the retrieved appointment data
      // this.appointmentForm.patchValue({
      //   fullname: appointment.fullname,
      //   email: appointment.email,
      //   phone: appointment.phone,
      //   date: appointment.date,
      //   time: appointment.time,
      //   reason: appointment.reason,
      //   id: appointment.id // Set the ID in the form for updating
      // });
  //   } else if (this.appointmentId) {
  //     // If an ID was provided but no appointment found
  //     alert('No appointment found with the provided ID.');
  //     // Optionally, you can redirect the user to the appointment list page
  //     // this.router.navigate(['/patient/appointment-list']);
  //   }
  // });

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
              doctor_id: " ", 
              approval_status: "",
              appointment_details: {
                reason: appointmentData.reason,
                drugs: "",
                diagnosis: "",
                payment: ""
              },
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

  // populateFormForEdit(appointment: any) {
  //   this.userService.getPatientById(appointment.patient_id).subscribe(
  //     (patient: any) => { // استخدم any هنا مؤقتًا، يمكنك تحديد النوع لاحقًا
  //       if (patient) {
  //         this.appointmentForm.patchValue({
  //           fullname: patient.name,
  //           email: patient.email,
  //           phone: patient.phone,
  //           date: appointment.date,
  //           time: this.formatTime(appointment.time),
  //           reason: appointment.appointment_details?.reason || '',
  //           id: appointment.id,
  //         });
  //       } else {
  //         alert('Could not find patient information for this appointment.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching patient information for edit:', error);
  //       alert('Error fetching patient details.');
  //     }
  //   );
  // }

  // formatTime(time: any): string {
  //   // ... تنفيذ تنسيق الوقت إذا لزم الأمر
  //   return time;
  // }
}
// submitAppointment() {
//   console.log("submitAppointment function called");
//   this.appointmentForm.markAllAsTouched(); // Mark all controls as touched
//   this.appointmentForm.updateValueAndValidity(); // Re-evaluate the validity of the form
//   console.log("Value of this.appointmentForm.valid:", this.appointmentForm.valid);
//   console.log("Form errors:", this.appointmentForm.errors);
//   if (this.appointmentForm.valid) {
//     const appointmentData = this.appointmentForm.value;
//     const email = appointmentData.email;
//   this.userService.getPatientByEmail(email).subscribe(
//     (patients)=>{
//       if(patients && patients.length>0){
//         const patient =patients[0];
//         const appointmentPatientIdSend ={
//           date:appointmentData.date,
//           patient_id:patient.id,
//           doctor_id:" ",
//           approval_status:" ",
//           appointment_details: {
//             reason: appointmentData.reason, 
//             drugs: "",
//             diagnosis: "",
//             payment: ""
//           }
//         };
//         console.log("Appointment Data With Patient ID:",appointmentPatientIdSend);
//         if (this.appointmentId) {
//       this.appointmentService.updateAppointment(this.appointmentId, appointmentPatientIdSend).subscribe(
//         (response: any) =>{
//           console.log('Appointment booked successfully:',response);
//           alert('Appointment booked successfully');
//           this.appointmentForm.reset();
//         },
//         (error) =>{
//           console.error('Error booking appointment:',error);
//           alert('Failed to book appointment. Please try again.');
//         }
//       );
//       }else {
//         this.appointmentService.addAppointment(appointmentPatientIdSend).subscribe(
//           (response: any) => {
//             console.log('Appointment booked successfully:', response);
//             alert('Appointment booked successfully');
//             this.appointmentForm.reset();
//           },
//           (error) => { console.error('Error booking appointment:', error);
//             alert('Failed to book appointment. Please try again.');
//           }
//         );
//       }
//     } else {
//         console.error('Could not find patient with this email.');
//         alert('Could not find patient with this email. Please try again.');
//       }
//     },
//     (error) => {
//       console.error('Error fetching patient information:', error);
//       alert('Error fetching patient information. Please try again.');
//     }
//   );
// } else {
//     console.log("else block executed!");
//     console.error('error #%d', this.appointmentForm.errors);
//     alert('Please fill in all the required fields.');
//   }
//   function submitAppointment() {
//     throw new Error('Function not implemented.');
//   }
// }

// function submitAppointment() {
//   throw new Error('Function not implemented.');
// }
// 2
// this.appointmentForm.markAllAsTouched();
// this.appointmentForm.updateValueAndValidity();

// if (this.appointmentForm.valid) {
//   const appointmentData = this.appointmentForm.value;

//   if (this.appointmentId) {
//     // Editing existing appointment
//     this.appointmentService.updateAppointment(this.appointmentId, appointmentData).subscribe(
//       (response) => {
//         console.log('Appointment updated successfully:', response);
//         alert('Appointment updated successfully');
//         this.appointmentForm.reset();
//         this.appointmentId = null; // Reset the ID after successful update
//       },
//       (error) => {
//         console.error('Error updating appointment:', error);
//         alert('error updating appointment');
//       }
//     );
//   } else {
//     // Adding new appointment (the original logic)
//     const email = appointmentData.email;
//     this.userService.getPatientByEmail(email).subscribe(
//       (patients) => {
//         if (patients && patients.length > 0) {
//           const patient = patients[0];
//           const appointmentPatientIdSend = {
//             date: appointmentData.date,
//             patient_id: patient.id,
//             doctor_id: " ", // You might need to handle this based on your logic
//             approval_status: " ", // Initial status
//             appointment_details: {
//               drugs: "",
//               diagnosis: "",
//               payment: ""
//             },
//             fullname: appointmentData.fullname, // Add other form fields if needed for new appointments
//             email: appointmentData.email,
//             phone: appointmentData.phone,
//             time: appointmentData.time,
//             reason: appointmentData.reason
//           };
//           console.log("Appointment Data With Patient ID:", appointmentPatientIdSend);
//           this.appointmentService.addAppointment(appointmentPatientIdSend).subscribe(
//             (response) => {
//               console.log('Appointment booked successfully:', response);
//               alert('successfully booked appointment');
//               this.appointmentForm.reset();
//             },
//             (error) => {
//               console.error('Error booking appointment:', error);
//               alert('error booking appointment. Please try again.');
//             }
//           );
//         } else {
//           console.error('Could not find patient with this email.');
//           alert('Could not find patient with this email. Please try again.');
//         }
//       },
//       (error) => {
//         console.error('Error fetching patient information:', error);
//         alert('error fetching patient information. Please try again.');
//       }
//     );
//   }
// } else {
//   console.error('Form is invalid:', this.appointmentForm.errors);
//   alert('please fill in all the required fields.');
// }
// }








