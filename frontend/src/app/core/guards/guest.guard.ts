import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../../features/auth/services/auth.service';

export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
}
