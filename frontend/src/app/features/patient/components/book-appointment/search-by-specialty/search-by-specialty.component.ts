import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Medic } from '../../../../medic/models/medic';
import { UserService } from '../../../../../core/services/user.service';
import { User } from '../../../../auth/models/user.model';
import { AppointmentsService } from '../../../services/appointments.service';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';


interface Specialty {
  id: number;
  name: string;
}

@Component({
  selector: 'app-search-by-specialty',
  standalone: true,
  imports: [FormsModule, CommonModule, DropdownModule],
  templateUrl: './search-by-specialty.component.html',
  styleUrls: ['./search-by-specialty.component.scss'],
  providers: [DatePipe]
})
export class SearchBySpecialtyComponent implements OnInit {
  specialties: Specialty[] = [
    { id: 1, name: 'Cardiología' },
    { id: 2, name: 'Dermatología' },
    { id: 3, name: 'Endocrinología' },
    { id: 4, name: 'Gastroenterología' },
    { id: 5, name: 'Neurología' },
    { id: 6, name: 'Oftalmología' },
    { id: 7, name: 'Pediatría' },
    { id: 8, name: 'Psiquiatría' },
    { id: 9, name: 'Traumatología' },
    { id: 10, name: 'Urología' }
  ];

  selectedSpecialty: Specialty | null = null;
  medics: Medic[] = [];
  filteredMedics: Medic[] = [];
  selectedMedic: Medic | null = null;
  loading: boolean = false;
  activeStep: number = 1;
  selectedDate: Date = new Date();
  selectedHour: string | null = null;
  availableHours: string[] = [];
  currentUser: User | null | undefined;
  searchTerm: string = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService,
    private appointmentsService: AppointmentsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  onSpecialtySelect(): void {
    if (!this.selectedSpecialty) return;

    this.loading = true;
    this.http.get<Medic[]>(`${environment.apiUrl}/api/v1/medics/specialty/${this.selectedSpecialty.name.toLowerCase()}`)
      .subscribe({
        next: (medics) => {
          this.medics = medics;
          this.filteredMedics = [...medics];
          this.loading = false;
          if (medics.length === 0) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Sin resultados',
              detail: 'No se encontraron médicos para esta especialidad'
            });
          }
        },
        error: (error) => {
          console.error('Error loading medics by specialty', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo cargar la lista de médicos'
          });
          this.loading = false;
        }
      });
  }

  filterMedics(): void {
    if (!this.searchTerm) {
      this.filteredMedics = [...this.medics];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredMedics = this.medics.filter(medic =>
      medic.full_name.toLowerCase().includes(term) ||
      medic.specialty.toLowerCase().includes(term) ||
      medic.email.toLowerCase().includes(term)
    );
  }

  loadAvailableHours(): void {
    if (!this.selectedMedic || !this.selectedDate) return;

    const formattedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    if (!formattedDate) return;

    this.appointmentsService.getAvailableHours(this.selectedMedic.id, formattedDate)
      .subscribe({
        next: (data) => {
          this.availableHours = data.available || [];
          this.selectedHour = null;
        },
        error: (error) => {
          console.error('Error loading available hours', error);
          this.availableHours = [];
          this.selectedHour = null;
        }
      });
  }

  selectHour(hour: string): void {
    this.selectedHour = hour;
  }

  confirmAppointment(): void {
    if (!this.selectedMedic || !this.selectedDate || !this.selectedHour) return;

    this.loading = true;
    const formattedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    if (!formattedDate) return;

    this.appointmentsService.createAppointment(
      this.selectedMedic,
      formattedDate,
      this.selectedHour
    ).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cita programada correctamente'
        });
        this.activeStep = 4;
      },
      error: (error) => {
        console.error('Error creating appointment', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo programar la cita'
        });
      },
      complete: () => this.loading = false
    });
  }

  navigateBack(): void {
    this.router.navigate(['/patient/book-appointments']);
  }
}
