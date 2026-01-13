import { CanActivateFn , UrlTree} from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.getToken();  
  const role = tokenService.getRole();

  if (!token || role !== 'user') {
    return router.parseUrl('/not-authorized');
  }

  return true;
};

