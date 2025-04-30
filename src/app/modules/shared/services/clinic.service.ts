import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clinic } from '../models/clinic.model';


@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private http: HttpClient) {}
 
  private baseUrl = 'http://localhost:3000';
  getClinics(): Observable<Clinic[]> {
    return this.http.get<Clinic[]>(`${this.baseUrl}/clinic`);
    }
}
