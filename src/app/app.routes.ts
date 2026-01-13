import { NotAuthorized } from './features/public/not-authorized/not-authorized';
import { publicRoutes } from './features/public/public.routes';
import { privateRoutes } from './features/private/private.routes';

export const routes = [
  ...publicRoutes,
   { path: 'not-authorized', component: NotAuthorized }, 
  ...privateRoutes

];
