import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../shared/models/appointment.model';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';
import { PatientAuthService } from '../../services/patient-auth.service';
import { Clinic } from '../../../shared/models/clinic.model';
import { Doctor } from '../../../shared/models/doctor.model';
import { Patient } from '../../../shared/models/patient.model';
import { ClinicService } from '../../../shared/services/clinic.service';
import { DoctorService } from '../../../doctor/services/doctor.service';

@Component({
  selector: 'app-patient-appointment-list',
  standalone: false,
  templateUrl: './patient-appointment-list.component.html',
  styleUrl: './patient-appointment-list.component.scss'
})
export class PatientAppointmentListComponent implements OnInit {
  appointmentsList: Appointment[] = [];
  patientId: string | undefined;
  clinics: Clinic[] = [];
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  constructor(private route: Router,
    private router: ActivatedRoute,
    private appointmentService: AppointmentService,
    private userService: UserService,
    private patientService: PatientAuthService,
    private clinicService: ClinicService,
    private doctorService: DoctorService
  ) {

  }
  ngOnInit(): void {
    //get patient id from local storage
    const userObj: User = this.userService.getCurrentUser()
    console.log("user in local storage", userObj)

    if (userObj) {

      console.log('user-email', userObj.email)
      this.patientService.getCurrentPatientId(userObj.email).subscribe(
        (currentPatientId) => {
          console.log("current patient id", currentPatientId)
          this.patientId = currentPatientId?.toString()
          console.log('patientId', this.patientId)

          //get appointment lists 
          if (this.patientId) {

            this.appointmentService.getAppointmentsByPatient(this.patientId).subscribe(
              (appointments) => {
                console.log('Appointments for patient:', appointments);
                this.appointmentsList = appointments;

              },
              (error) => {
                console.error('Error fetching appointments:', error);
              }
            )
          }
        }
      )
    }


    this.clinicService.getClinics().subscribe((clinics) => {
      this.clinics = clinics;
    });
    this.patientService.getPatientsList().subscribe((patients) => {
      this.patients = patients;
    });
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
    });


  }


  getClinicName(clinicId: string): string {
    const clinic = this.clinics.find((clinic) => clinic.id?.toString() == clinicId);

    return clinic ? clinic.name : 'Unknown Clinic';
  }
  getDoctorName(doctorId: string): string {
    const doctor = this.doctors.find((doctor) => doctor.id?.toString() == doctorId);
    console.log("doctor", doctor)
    return doctor ? doctor.name : 'Unknown Doctor';
  }
  getPatientName(patientId: string): string {
    const patient = this.patients.find((patient) => patient.id?.toString() == patientId);
    console.log("patient", patient)
    return patient ? patient.username : 'Unknown Patient';
  }

  getClinicNameByDoctorId(doctorId: string): string {
    const doctor = this.doctors.find(d => d.id?.toString() == doctorId);
    if (doctor) {
      const clinic = this.clinics.find(c => c.id?.toString() == doctor.clinic_id);
      console.log("clinic", clinic)
      return clinic ? clinic.name : 'Unknown Clinic';
    }
    return 'Unknown Clinic';
  }



}
