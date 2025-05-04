import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient, private router: Router) { }
  getUser(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}&password=${password}`)
  }
  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  getCurrentUserType(): string {
    const user = this.getCurrentUser();
    return user?.type || '';
  }
  addUserDoctor(doctor: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, doctor);
  }

  getUserDoctorByEmail(email: string): Observable<User> {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}`).pipe(
      map(users => users[0])
    );
  }
  updateUserDoctorByid(id?: string, updatedUserDoctor?: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, updatedUserDoctor);
  }
  deleteUserDoctorByid(id?: string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }
}
