import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {Toast} from '../../shared/components/toast';
import { catchError, throwError } from 'rxjs';
import { mapHttpError } from '../utils/error-mapping';

export const globalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast= inject(Toast);

return next(req).pipe(
  catchError(err => { toast.error(mapHttpError(err));
     return throwError(() => err);
  })
);
  };
