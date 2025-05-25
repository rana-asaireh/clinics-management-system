import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../modules/shared/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  loginButton(): void {
    const isLogged = this.authService.isLoggedIn();
    const type = this.userService.getCurrentUserType();
    if (isLogged) {
      if (type === 'admin') {
        this.router.navigate(['admin']);
      } else if (type === 'doctor') {
        this.router.navigate(['doctor']);
      } else {
        this.router.navigate(['patient']);
      }
    } else {
      this.router.navigate(['login']);
    }
  }
}
