import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clinic } from '../models/clinic.model';


@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000/clinic';
  getClinics(): Observable<Clinic[]> {
    return this.http.get<Clinic[]>(`${this.baseUrl}`);
  }
  getClinicById(id?: string): Observable<Clinic> {
    return this.http.get<Clinic>(`${this.baseUrl}/${id}`);
  }
  updateClinicById(id?: string, updatedClinic?: Clinic): Observable<Clinic> {
    return this.http.put<Clinic>(`${this.baseUrl}/${id}`, updatedClinic);
  }
}
