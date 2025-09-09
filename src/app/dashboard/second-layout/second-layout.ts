import { Component } from '@angular/core';
import { AuthService } from '../../services/authServices/auth';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second-layout',
  imports: [],
  templateUrl: './second-layout.html',
  styleUrl: './second-layout.css'
})
export class SecondLayout {

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  logoutUser() {
    this.authService.logout().subscribe(
      {
        next: (response: any) => {
          if (response) {
            this.messageService.add({
              severity: 'success',
              summary: 'Logout Successful',
              detail: `User logout has been successfully!`
            });
            this.router.navigate(['/']);
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Logout Failed',
              detail: 'Invalid response from server. Please try again.'
            });
          }
        }
      }
    );
  }
}
