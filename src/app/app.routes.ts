import { Routes } from '@angular/router';
import { NotFoundComponent } from './notfound';
import { Login } from './components/login/login';


export const routes: Routes = [
  { path: '', component: Login },
  { path: '**', component: NotFoundComponent }
];