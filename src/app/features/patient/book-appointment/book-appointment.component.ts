import { Component } from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';

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

}
