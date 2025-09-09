import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SecondLayout } from '../../dashboard/second-layout/second-layout';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SecondLayout, ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
