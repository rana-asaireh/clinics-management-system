import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../../shared/models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = 'http://localhost:3000/doctor';

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.baseUrl);
  }
  getDoctorById(id?: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/${id}`);
  }

  updateDoctorById(id?: string, updatedDoctor?: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.baseUrl}/${id}`, updatedDoctor);
  }

  //get doctor
  getDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/doctor/${id}`)
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
    return this.http.get<Doctor[]>(`${this.baseUrl}`, { params })
  }

}

