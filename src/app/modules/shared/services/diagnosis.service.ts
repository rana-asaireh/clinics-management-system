import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diagnosis } from '../models/diagnosis.model';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  constructor(private http: HttpClient) {}
 
  private baseUrl = 'http://localhost:3000';
  getDiagnosis(): Observable<Diagnosis[]> {
    return this.http.get<Diagnosis[]>(`${this.baseUrl}/diagnosis`);
    }
}
