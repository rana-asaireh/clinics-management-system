import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, retry } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { AppComponent } from '../../../app.component';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:3000/appointment'
  private doctorUrl = 'http://localhost:3000/doctor'
  private patientUrl = 'http://localhost:3000/patient'
  constructor(private http: HttpClient) { }


  //get appointments
  // getAppointmentsByPatient(patientId: string, sortColumn?: string, sortDirection?: string): Observable<any[]> {
  //   return this.http.get<any[]>(this.baseUrl).pipe(
  //     map((appointments) => {
  //       return appointments.filter(appointment => appointment.patient_id === patientId); // Filter appointments by patient_id
  //     }),

  //   );
  // }
  //get appointment by Fields ex : patient-id , doctor-id ,id 
  getAppointmentsByAnyField(field: string, idValue: string, expandFields?: string[]): Observable<Appointment[]> {
    let url = `${this.baseUrl}?${field}=${idValue}`;

    if (expandFields?.length) {
      for (const expandField of expandFields) {
        url += `&_expand=${expandField}`;
      }
    }

    return this.http.get<Appointment[]>(url);
  }


  //get appointment by id
  getAppointmentById(appointmentId: string): Observable<Appointment> {
    return this.http.get<Appointment>(this.baseUrl + '/' + appointmentId)
  }

  getAppointmentsByPatientSorted(patientId: string, sortColumn: string, sortDirection: string): Observable<Appointment[]> {
    const url = `${this.baseUrl}?patient_id=${patientId}&_sort=${sortColumn}&_order=${sortDirection}`;
    return this.http.get<Appointment[]>(url);
  }
  getAppointmentsByPatient(patientId: string, sortColumn?: string, sortDirection: string = 'asc'): Observable<Appointment[]> {
    let url = `${this.baseUrl}?patient_id=${patientId}`;

    if (sortColumn && sortDirection) {
      url += `&_sort=${sortColumn}&_order=${sortDirection}`;
    }

    return this.http.get<Appointment[]>(url);
  }
  getFilteredAppointment(patientId: string, selectedApproval?: string, sortColumn?: string, sortDirection: string = 'asc'): Observable<Appointment[]> {
    let params = new HttpParams().set('patient_id', patientId);

    if (selectedApproval) {
      params = params.set('approval_status', selectedApproval);
    }

    if (sortColumn) {
      params = params.set('_sort', sortColumn).set('_order', sortDirection);
    }

    return this.http.get<Appointment[]>(this.baseUrl, { params });
  }

  updateAppintmentStatus(appointmentId: string, updateData: { approval_status: string }): Observable<Appointment> {
    return this.http.patch<Appointment>(this.baseUrl + '/' + appointmentId, updateData)
  }
}
