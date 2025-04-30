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
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  getCurrentUserType(): string {
    const user = this.getCurrentUser();
    return user?.type || '';
  }

  addUser(user: User): Observable<User> {

    return this.http.post<User>(this.baseUrl, user).pipe(
      map((userWithId) => {

        // Remove the 'id' field from the response before returning it
        this.http.delete<void>(`${this.baseUrl}/${user.id}`);
        const { id, ...userWithoutId } = userWithId; // destructure and exclude 'id'
        return userWithId; // return the user without 'id'
      })
    );
  }

}
