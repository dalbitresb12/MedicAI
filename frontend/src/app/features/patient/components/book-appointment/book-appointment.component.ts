import {Component, inject} from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-appointment',
  imports: [
    Card,
    Button,
    PrimeTemplate
  ],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss'
})
export class BookAppointmentComponent {

  router = inject(Router);

  navigateTo(routerLink: string | undefined): void {
    if (routerLink) {
      this.router.navigate([routerLink]);
    }
  }

}
