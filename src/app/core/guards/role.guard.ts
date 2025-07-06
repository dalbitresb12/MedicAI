import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../features/auth/services/auth.service';
import {UserRole} from '../../features/auth/models/user.model';
import {inject} from '@angular/core';

export const RoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as UserRole[];
  const currentUser = authService.getCurrentUser();

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  if (!currentUser) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  const hasRequiredRole = requiredRoles.includes(currentUser.role);
  if (hasRequiredRole) {
    console.log('[RolesGuard] Acceso permitido para rol:', currentUser.role);
    return true;
  }

  console.warn(
    `[RolesGuard] Acceso denegado. Rol actual: ${currentUser.role}, ` +
    `Roles requeridos: ${requiredRoles.join(', ')}`
  );

  return router.createUrlTree(['/unauthorized'], {
    queryParams: {
      requiredRoles: requiredRoles.join(','),
      currentRole: currentUser.role
    }
  });
};
