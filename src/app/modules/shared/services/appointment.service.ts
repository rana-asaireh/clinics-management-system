import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, retry } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:3000/appointment'
  private doctorUrl = 'http://localhost:3000/doctor'
  private patientUrl = 'http://localhost:3000/patient'
  constructor(private http: HttpClient) { }


  //get appointments
  getAppointmentsByPatient(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((appointments) => {
        return appointments.filter(appointment => appointment.patient_id === patientId); // Filter appointments by patient_id
      }),

    );
  }
  //get appointment by Fields ex : patient-id , doctor-id ,id 
  getAppointmentsByAnyField(field: string, idValue: string, expandFields?: string[]): Observable<Appointment[]> {
    const params: any = { [field]: idValue };
    console.log("Param is ", params)
    if (expandFields?.length) {
      params['_expand'] = expandFields;
    }

    return this.http.get<Appointment[]>(this.baseUrl, { params });
  }


  //get appointment by id
  getAppointmentById(appointmentId: string): Observable<Appointment> {
    return this.http.get<Appointment>(this.baseUrl + '/' + appointmentId)
  }

}
