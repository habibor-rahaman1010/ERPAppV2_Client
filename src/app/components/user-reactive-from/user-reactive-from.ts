import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-reactive-from',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-reactive-from.html',
  styleUrl: './user-reactive-from.css',
  providers: [AuthService],
})
export class UserReactiveFrom {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService) {}

  user: User = {
      username: '',
      password: ''
    }

  
  onSubmit() {  
    if (this.loginForm.invalid) return;

    const formData = this.loginForm.value; 
    

    this.authService.userLogin(this.user).subscribe((response: any) => {
      if (response) {
        console.log('Login success:', response);
        alert(`Welcome ${response.username || formData.username}`);
      } else {
        alert('Login failed!');
      }
    });
  }
}
