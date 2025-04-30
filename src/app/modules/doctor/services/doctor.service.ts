
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../../shared/models/doctor.model';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }


  private baseUrl = 'http://localhost:3000';

  //get doctors
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctors`);
  }

  //get doctor
  getDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/doctors/${id}`)
  }
  //get Filtered doctors by name or clinic_id (rahaf)

  getFilteredDoctors(clinicId?: string, doctorName?: string): Observable<Doctor[]> {
    let params = new HttpParams();
    if (clinicId) {
      params = params.set('clinic_id', clinicId)
    }
    if (doctorName && doctorName.trim() !== '') {
      params = params.set('name_like', doctorName)
    }
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctors`, { params })
  }

}



