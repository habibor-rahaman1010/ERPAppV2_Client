import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [AuthService]
})
export class Login {

  constructor(private authService: AuthService) { }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

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
            alert('Login successful');
            console.log(response);
          }
          else {
            alert('Login failed');
          }
        },
        error: (err) => {
          if (err.status === 401) {
            alert('Incorrect username or password');
          }
          else {
            alert('Something went wrong. Please try again later.');
          }
          console.error(err);
        }
      });
    }
    else {
      return;
    }
  }
}