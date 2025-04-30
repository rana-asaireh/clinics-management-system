import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Clinic } from "../models/clinic.model";
import { HttpBackend, HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ClinicService {
    baseUrl = 'http://localhost:3000/clinic'
    constructor(private http: HttpClient) {

    }

    //get clinics 
    getClinics(): Observable<Clinic[]> {
        return this.http.get<Clinic[]>(this.baseUrl);
    }

    //get Clinic
    getClinic(id: number): Observable<Clinic> {
        return this.http.get<Clinic>(this.baseUrl + `/${id}`)
    }

}