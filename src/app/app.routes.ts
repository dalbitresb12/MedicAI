import { Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {LoginComponent} from './features/auth/components/login/login.component';
import {GuestGuard} from './core/guards/guest.guard';
import {RoleGuard} from './core/guards/role.guard';
import {UserRole} from './features/auth/models/user.model';
import {LogoutComponent} from './shared/components/layout/logout/logout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
    children: [
      { path: 'home', loadComponent: () => import('./shared/components/layout/home/home.component').then(m => m.HomeComponent) },
    ]

  },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'admin',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.ADMIN] },
    children: [
      { path: 'users', loadComponent: () => import('./features/admin/users-management/users-management.component').then(m => m.UsersManagementComponent) },
      { path: 'profile', loadComponent: () => import('./features/admin/profile/profile.component').then(m => m.ProfileComponent) }
    ]
  },

  {
    path: 'patient',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.PATIENT] },
    children: [
      { path: 'my-appointments', loadComponent: () => import('./features/patient/my-appointment/my-appointment.component').then(m => m.MyAppointmentComponent) },
      { path: 'book-appointments',
        loadComponent: () => import('./features/patient/book-appointment/book-appointment.component').then(m => m.BookAppointmentComponent) ,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [UserRole.PATIENT] },
        children: [
          { path: 'search-availability', loadComponent: () => import('./features/patient/book-appointment/search-availability/search-availability.component').then(m => m.SearchAvailabilityComponent) },
        ]
      },

      { path: 'profile',
        loadComponent: () => import('./features/patient/profile/profile.component').then(m => m.ProfileComponent),
        /*canActivate: [AuthGuard, RoleGuard],
        data: { roles: [UserRole.PATIENT] },
        children: [
          { path: 'book-appointments', loadComponent: () => import('./features/patient/book-appointment/book-appointment.component').then(m => m.BookAppointmentComponent) },
        ]*/
      },
      { path: 'medical-history', loadComponent: () => import('./features/patient/medical-history/medical-history.component').then(m => m.MedicalHistoryComponent) },
    ]
  },
  {
    path: 'medic',
    loadComponent: () =>  import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.MEDIC] },
    children: [
      { path: 'profile', loadComponent: () => import('./features/medic/profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'schedule', loadComponent: () => import('./features/medic/my-calendar/my-calendar.component').then(m => m.MyCalendarComponent) },
      { path: 'medical-history', loadComponent: () => import('./features/medic/clinical-history/clinical-history.component').then(m => m.ClinicalHistoryComponent) },
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }

];
