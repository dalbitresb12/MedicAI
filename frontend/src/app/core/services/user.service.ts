import { Injectable } from '@angular/core';
import {AuthService} from '../../features/auth/services/auth.service';
import {User, UserRole} from '../../features/auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authService: AuthService) {}

  getCurrentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  isMedic(): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === UserRole.MEDIC : false;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === UserRole.ADMIN : false;
  }

  isPatient(): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === UserRole.PATIENT : false;
  }
}
