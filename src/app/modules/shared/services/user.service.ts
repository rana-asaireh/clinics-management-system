import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users'; 
  constructor(private http: HttpClient, private router: Router) { }
  getUser(email:string, password:string):Observable<User[]>{
       return this.http.get<User[]>(`${this.baseUrl}?email=${email}&password=${password}`)    
  }
  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  getCurrentUserType():string{
    const user = this.getCurrentUser();
    return user?.type || '';
  }
}
