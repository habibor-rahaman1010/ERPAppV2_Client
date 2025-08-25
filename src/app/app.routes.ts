import { Routes } from '@angular/router';
import { UserReactiveFrom } from './components/user-reactive-from/user-reactive-from';
import { UserLogin } from './components/user-login/user-login';
import { NotFoundComponent } from './notfound';
import { Home } from './components/home/home';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'user-templating-form', component: UserLogin},
  {path: 'user-reactive-form', component: UserReactiveFrom},
  {path: '**', component: NotFoundComponent}
];