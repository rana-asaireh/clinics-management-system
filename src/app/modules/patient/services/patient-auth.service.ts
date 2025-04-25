import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, retry, switchMap } from "rxjs";

import { FormControl } from "@angular/forms";
import { Patient } from "../../shared/models/patient.model";

@Injectable()
export class PatientAuthService {


  baseUrl = 'http://localhost:3000/patient'
  constructor(private httpClient: HttpClient) {

  }


  getPatientsList(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.baseUrl)
  }

  //check if email of user  is exist 
  checkEmailExist(email: string): Observable<boolean> {
    return this.httpClient.get<Patient[]>(this.baseUrl + '?email=' + email).pipe(
      map((patients) => patients.length > 0) //true if at least one match
    )

  }


  addPatient(patient: Patient): Observable<Patient[]> {
    return this.getPatientsList().pipe(
      map(patients => {
        const lastId: number | undefined = patients.length > 0
          ? (patients.length) : 0;
        const newId = (lastId+ 1); // convert back to string
        return { ...patient, id: newId };
      }),
      switchMap(newPatient =>
        this.httpClient.post<Patient>(this.baseUrl, newPatient).pipe(
          switchMap(() => this.getPatientsList()) // return updated list
        )
      )
    );
  }


}