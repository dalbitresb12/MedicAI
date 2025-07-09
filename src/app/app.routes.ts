import { Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {LoginComponent} from './features/auth/components/login/login.component';
import {GuestGuard} from './core/guards/guest.guard';
import {RoleGuard} from './core/guards/role.guard';
import {UserRole} from './features/auth/models/user.model';
import {LogoutComponent} from './shared/components/layout/logout/logout.component';
import {RegisterComponent} from './features/auth/components/register/register.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
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
      { path: 'my-appointments', loadComponent: () => import('./features/patient/components/my-appointment/my-appointment.component').then(m => m.MyAppointmentsComponent) },
      { path: 'book-appointments', loadComponent: () => import('./features/patient/components/book-appointment/book-appointment.component').then(m => m.BookAppointmentComponent)},
      { path: 'my-appointments/search-availability', loadComponent: () => import('./features/patient/components/book-appointment/search-availability/search-availability.component').then(m => m.SearchAvailabilityComponent) },
      { path: 'my-appointments/search-by-specialty', loadComponent: () => import('./features/patient/components/book-appointment/search-by-specialty/search-by-specialty.component').then(m => m.SearchBySpecialtyComponent) },
      { path: 'my-appointments/search-by-doctor', loadComponent: () => import('./features/patient/components/book-appointment/search-by-doctor/search-by-doctor.component').then(m => m.SearchByDoctorComponent) },
      { path: 'profile', loadComponent: () => import('./features/patient/components/profile/profile.component').then(m => m.ProfileComponent)},
      { path: 'medical-history', loadComponent: () => import('./features/patient/components/medical-history/medical-history.component').then(m => m.MedicalHistoryComponent) },
    ]
  },
  {
    path: 'medic',
    loadComponent: () =>  import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.MEDIC] },
    children: [
      { path: 'profile', loadComponent: () => import('./features/medic/components/profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'schedule', loadComponent: () => import('./features/medic/components/my-calendar/my-calendar.component').then(m => m.MyCalendarComponent) },
      { path: 'medical-history', loadComponent: () => import('./features/medic/components/clinical-history/clinical-history.component').then(m => m.ClinicalHistoryComponent) },
      { path: 'add-medical-history', loadComponent: () => import('./features/medic/components/add-clinical-history/add-clinical-history.component').then(m => m.AddClinicalHistoryComponent) },
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
