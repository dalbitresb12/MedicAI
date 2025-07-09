import {inject, Injectable} from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse} from '@angular/common/http';
import {catchError,throwError} from 'rxjs';
import {Router} from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigateByUrl('/auth/login');
      }
      return throwError(() => error);
    })
  );
};
