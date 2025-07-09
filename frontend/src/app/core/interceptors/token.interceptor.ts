import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authStorage = inject(AuthService);
  const token = authStorage.getToken();

  const newRequest = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });

  return next(newRequest);
};
