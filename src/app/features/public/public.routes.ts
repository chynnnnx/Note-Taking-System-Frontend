import { Routes } from '@angular/router';
import { PublicLayout } from '../../layouts/public-layout/public-layout';
import { About } from './about/about';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { NotAuthorized } from './not-authorized/not-authorized';

export const publicRoutes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'signup', component: Signup },
        { path: 'about', component: About },
       { path: 'not-authorized', component: NotAuthorized },
    ]
  }
];
