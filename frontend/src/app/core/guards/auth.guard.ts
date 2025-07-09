import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { MessageService } from 'primeng/api';
import {AuthService} from '../../features/auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.messageService.add({
      severity: 'warn',
      summary: 'Sesión expirada',
      detail: 'Su sesión a expirado',
      life: 5000
    });

    this.router.navigate(['/login']);
    return false;
  }
}
