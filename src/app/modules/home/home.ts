import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SecondLayout } from '../../dashboard/second-layout/second-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SecondLayout, ButtonModule, CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  userModules: any[] = [];

  ngOnInit(): void {
    const data = localStorage.getItem('userModules');
    if (data) {
      this.userModules = JSON.parse(data);
    }
  }
}