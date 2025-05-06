import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Doctor } from '../../shared/models/doctor.model';
import { Appointment } from '../../shared/models/appointment';
import { Patient } from '../../shared/models/patient';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000';
  private appointmentsUrl = 'http://localhost:3000/appointment';
  private patientsUrl = 'http://localhost:3000/patient';

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctor`);
  }
  // updateDoctor(id: number, data: Doctor): Observable<Doctor> {
  //   return this.http.patch<Doctor>(`${this.baseUrl}/doctor/${id}`, data);
  // }

  // getDoctor(id: number): Observable<Doctor> {
  //   return this.http.get<Doctor>(`${this.baseUrl}/doctor/${id}`);
  // }
  // getAppointment():Observable<>{

  // }
  // getDoctorAppointments(doctor_id: string): Observable<Appointment[]> {
  //   return this.http
  //     .get<Appointment[]>(`${this.baseUrl}/appointment/?doctor_id=${doctor_id}`)
  //     .pipe(
  //       map((appointments) => {
  //         console.log('Appointments fetched:', appointments); // إضافة هذا السطر لتفقد البيانات
  //         return appointments;
  //       })
  //     );
  // }

  // getPatientById(patientId: string): Observable<Patient> {
  //   return this.http.get<Patient>(`${this.baseUrl}/patients/${patientId}`);
  // }

  // getAppointmentsByDoctor(doctorId: number): Observable<Appointment[]> {
  //   return this.http.get<Appointment[]>(
  //     `${this.baseUrl}/appointments/doctor/${doctorId}`
  //   );
  // }

  // // 2. Get a single Patient by patient ID
  // getPatientById(patientId: string): Observable<Patient> {
  //   return this.http.get<Patient>(`${this.baseUrl}/patients/${patientId}`);
  // }

  // getPatientsByDoctor(doctorId: number): Observable<Patient[]> {
  //   return this.getAppointmentsByDoctor(doctorId).pipe(
  //     switchMap((appointments: Appointment[]) => {
  //       const patientRequests = appointments.map((app) =>
  //         this.getPatientById(app.patient_id)
  //       );
  //       return forkJoin(patientRequests); // waits for all patient requests
  //     })
  //   );
  // }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.appointmentsUrl);
  }

  getDoctorByEmail(email: string): Observable<string> {
    return this.http
      .get<Doctor[]>(`${this.baseUrl}/doctor?email=${email}`)
      .pipe(
        map((doctors) => {
          if (doctors.length > 0 && doctors[0].id) {
            return doctors[0].id.toString(); // ensure string output
          } else {
            throw new Error('Doctor not found');
          }
        })
      );
  }
  getPatientsByDoctor(doctorId: string) {
    return this.http.get<Appointment[]>(
      `${this.baseUrl}/appointment?doctor_id=${doctorId}`
    );
  }
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientsUrl);
  }
  getAppointmentById(id: string): Observable<Appointment> {
    return this.http
      .get<Appointment[]>(`${this.appointmentsUrl}?id=${id}`)
      .pipe(map((appointments) => appointments[0]));
  }
  updateAppointmentStatus(
    id: string,
    updatedAppointment: Appointment
  ): Observable<Appointment> {
    return this.http.patch<Appointment>(
      `${this.appointmentsUrl}/${id}`,
      updatedAppointment
    );
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.http
      .get<Doctor[]>(`${this.baseUrl}/doctor?id=${id}`)
      .pipe(map((doctors) => doctors[0]));
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http
      .get<Patient[]>(`${this.baseUrl}/patient?id=${id}`)
      .pipe(map((patients) => patients[0]));
  }
}
