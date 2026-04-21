import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { TokenService } from './core/services/token.service';
import { MessageService } from 'primeng/api';
import { globalHttpErrorInterceptor } from './core/interceptors/global-http-error-interceptor';
import { globalLoadingInterceptor } from './core/interceptors/loading-interceptor';
import { Toast } from './shared/components/toast';
import { ConfirmService } from './shared/services/confirm.service';
import { ConfirmationService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, globalHttpErrorInterceptor, globalLoadingInterceptor
    ])),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
             darkModeSelector: 'none',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          }
        }
      }
    }),
    importProvidersFrom(SharedModule),
    TokenService,
    MessageService,
    Toast,
    ConfirmService,
    ConfirmationService
  ]
}; 
