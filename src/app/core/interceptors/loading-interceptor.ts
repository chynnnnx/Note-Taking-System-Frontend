import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Loading} from '../../shared/services/loading';

export const globalLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(Loading);

  loadingService.show();  

  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};
