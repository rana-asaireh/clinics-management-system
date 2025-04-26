import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drug } from '../models/drug.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor(private http: HttpClient) {}
 
  private baseUrl = 'http://localhost:3000';
  getDrugs(): Observable<Drug[]> {
    return this.http.get<Drug[]>(`${this.baseUrl}/drug`);
    }
}
