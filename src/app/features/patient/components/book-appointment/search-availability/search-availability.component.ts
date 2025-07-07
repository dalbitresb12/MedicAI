import {Component, inject} from '@angular/core';
import {AuthService} from '../../../../auth/services/auth.service';
import {UserService} from '../../../../../core/services/user.service';
import {Router} from '@angular/router';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {MenuItem, PrimeTemplate} from 'primeng/api';
import {Breadcrumb} from 'primeng/breadcrumb';

@Component({
  selector: 'app-search-availability',
  imports: [
    Card,
    Button,
    PrimeTemplate,
    Breadcrumb
  ],
  templateUrl: './search-availability.component.html',
  styleUrl: './search-availability.component.scss'
})
export class SearchAvailabilityComponent {

  user = inject(UserService);

  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/dashboard/home' };

  constructor(private router: Router) {
    this.items = [
      { label: 'Solicitar Cita', routerLink: '/patient/book-appointments' },
      { label: 'Buscar Disponibilidad' }
    ];
  }


  searchBySpecialty() {
    this.router.navigate(['/patient/my-appointments/search-by-specialty']);
  }

  searchByDoctor() {
    this.router.navigate(['/patient/my-appointments/search-by-doctor']);
  }



}
