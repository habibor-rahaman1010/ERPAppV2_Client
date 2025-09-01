import { Routes } from '@angular/router';
import { NotFoundComponent } from './notfound';
import { Login } from './components/authentication/login/login';
import { BaseContent } from './dashboard/base-content/base-content';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: BaseContent },
  { path: '**', component: NotFoundComponent }
];