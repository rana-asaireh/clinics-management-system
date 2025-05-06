import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../modules/shared/services/user.service';
import { User } from '../modules/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }
  private baseUrl = 'http://localhost:3000/users';

  login(email: string, password: string): Observable<User> {
    return this.userService.getUser(email, password).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          const currentUser: User = {
            type: user.type,
            name: user.name,
            email: user.email
          }
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          console.log(currentUser)
          return user;
        } else {
          throw new Error('Invalid email or password');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
