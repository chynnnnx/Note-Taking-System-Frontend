import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { switchMap, catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  const token = tokenService.getToken();
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401) return throwError(() => err);

      const refresh = tokenService.getRefreshToken();
      if (!refresh) {
        tokenService.logout();
        return throwError(() => err);
      }

       return authService.refreshToken(refresh).pipe(
        switchMap(res => {
          tokenService.setToken(res.token);
          tokenService.setRefreshToken(res.refreshToken);

          const newReq = req.clone({
            setHeaders: { Authorization: `Bearer ${res.token}` }
          });

          return next(newReq);
        }),

        catchError(refreshErr => {
          tokenService.logout();
          return throwError(() => refreshErr);
        })
      );

    })
  );
};
