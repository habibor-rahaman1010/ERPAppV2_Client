import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authServices/auth';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, ToastModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [AuthService]
})
export class Login implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  user: User = {
    username: '',
    password: '',
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.user = { ...this.loginForm.value } as User;

      this.authService.userLogin(this.user).subscribe({
        next: (response: any) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userMenues', JSON.stringify(response.menuDetails));

            this.messageService.add({
              severity: 'success',
              summary: 'Login Successful',
              detail: `Welcome back, ${this.user.username}!`
            });

            this.router.navigate(['/dashboard']);
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Login Failed',
              detail: 'Invalid response from server. Please try again.'
            });
          }
        },
        error: (err) => {
          if (err.status === 401) {
            this.messageService.add({
              severity: 'error',
              summary: 'Authentication Failed',
              detail: 'Incorrect username or password.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Server Error',
              detail: 'Something went wrong. Please try again later.'
            });
          }
          console.error(err);
        }
      });
    }
  }
}