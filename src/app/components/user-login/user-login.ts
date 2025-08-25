import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css'
})
export class UserLogin {

  constructor(private authService: AuthService){}
    user: User = {
      username: '',
      password: ''
    }

    userOnSubmit(userform: any){
      if(userform.valid){
        this.authService.userLogin(this.user).subscribe(
          (response) => {
            localStorage.setItem('token', response.token);
            console.log('Login successful:', response);
            console.log(localStorage.getItem('token'));
            alert('Login Successful!');
          },
          (error) => {
            console.error('Login error:', error);
            alert('Invalid username or password');
          }
        );
      }
    }
}
