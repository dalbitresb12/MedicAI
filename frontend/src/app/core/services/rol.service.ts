import { Injectable } from '@angular/core';

import { MenuItem } from 'primeng/api';
import {User, UserRole} from '../../features/auth/models/user.model';
import {AuthService} from '../../features/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  constructor(private authService: AuthService) {}

  private readonly menuItemsByRole: Record<UserRole, MenuItem[]> = {
    [UserRole.ADMIN]: [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/dashboard/home' },
      { label: 'Mi Cuenta', icon: 'pi pi-user', routerLink: '/admin/profile' },
      { label: 'Gestión de Usuarios', icon: 'pi pi-users', routerLink: '/admin/users' },
      { label: 'Salir', icon: 'pi pi-sign-out', routerLink: '/logout' }
    ],
    [UserRole.MEDIC]: [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/dashboard/home' },
      { label: 'Mi Cuenta', icon: 'pi pi-users', routerLink: '/medic/profile' },
      /*{ label: 'Calendario', icon: 'pi pi-calendar', routerLink: '/medic/schedule' },*/
      { label: 'Ver Historia Clinica', icon: 'pi pi-file-o', routerLink: '/medic/medical-history' },
      { label: 'Agregar Historia Clinica', icon: 'pi pi-file-plus', routerLink: '/medic/add-medical-history' },
      { label: 'Salir', icon: 'pi pi-sign-out', routerLink: '/logout' }
    ],
    [UserRole.PATIENT]: [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/dashboard/home' },
      { label: 'Mi Cuenta', icon: 'pi pi-user', routerLink: '/patient/profile' },
      { label: 'Solicitar Cita', icon: 'pi pi-calendar-plus', routerLink: '/patient/book-appointments' },
      { label: 'Mis Citas', icon: 'pi pi-calendar', routerLink: '/patient/my-appointments' },
      { label: 'Mi Historia Clinica', icon: 'pi pi-file-o', routerLink: '/patient/medical-history' },
      /*{ label: 'Pedir Ambulancia', icon: 'pi pi-truck', routerLink: '/ambulancia' },*/
      { label: 'Salir', icon: 'pi pi-sign-out', routerLink: '/logout' }
    ]
  };

  getMenuItems(role: UserRole): MenuItem[] {
    return this.menuItemsByRole[role] || [];
  }

  getCurrentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  private getCurrentUserRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  isMedic(): boolean {
    return this.getCurrentUserRole() === UserRole.MEDIC;
  }

  isAdmin(): boolean {
    return this.getCurrentUserRole() === UserRole.ADMIN;
  }

  isPatient(): boolean {
    return this.getCurrentUserRole() === UserRole.PATIENT;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const userRole = this.getCurrentUserRole();
    return userRole ? roles.includes(userRole) : false;
  }
}
