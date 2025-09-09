import { Routes } from '@angular/router';
import { NotFoundComponent } from './notfound';
import { Login } from './components/authentication/login/login';
import { BaseContent } from './dashboard/base-content/base-content';
import { AuthGuard } from './services/authGuardService/authGuard';
import { Home } from './modules/home/home';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'modules', component: Home, canActivate: [AuthGuard] },
  { path: 'dashboard', component: BaseContent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];