import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MyPreset} from '../assets/styles/mypreset';
import {MessageService} from "primeng/api";
import {AuthGuard} from "./core/guards/auth.guard";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {tokenInterceptor} from "./core/interceptors/token.interceptor";
import {errorInterceptor} from "./core/interceptors/error.interceptor";
import {authInterceptor} from "./core/interceptors/auth.interceptor";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {RoleGuard} from './core/guards/role.guard';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withHashLocation()),
    provideAnimationsAsync(),
    provideHttpClient(
        withInterceptors([errorInterceptor, authInterceptor, tokenInterceptor]),
    ),
    AuthGuard,

    MessageService,
    importProvidersFrom([
      BrowserAnimationsModule,
      ToastModule
    ]),

    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          name: 'primeng',
          order: 'theme, base, primeng'
        }
      }
    })
  ]
};
