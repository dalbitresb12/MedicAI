import {Component, OnInit} from '@angular/core';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {Medic} from '../../../../medic/models/medic';
import {MedicService} from '../../../../medic/services/medic.service';
import {Breadcrumb} from 'primeng/breadcrumb';
import {MenuItem, MessageService} from 'primeng/api';
import {Router, RouterLink} from '@angular/router';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {HttpClient} from '@angular/common/http';
import {AppointmentsService} from '../../../services/appointments.service';
import {Tag} from 'primeng/tag';
import {UserService} from '../../../../../core/services/user.service';
import {User} from '../../../../auth/models/user.model';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-search-by-doctor',
  imports: [
    FormsModule,
    NgOptimizedImage,
    Select,
    Breadcrumb,
    Stepper,
    StepList,
    Step,
    StepPanels,
    StepPanel,
    Button,
    CalendarModule,
    Tag,
    DatePipe
  ],
  templateUrl: './search-by-doctor.component.html',
  styleUrl: './search-by-doctor.component.scss'
})
export class SearchByDoctorComponent implements OnInit {
  medics: Medic[] = [];
  selectedMedic: Medic | null = null;
  loading: boolean = true;
  activeStep: number = 1;
  selectedDate: Date = new Date();
  selectedHour: string | null = null;
  availableHours: string[] = [];
  selectedPeriod: string = 'week';
  minDate: Date = new Date();
  maxDate: Date = new Date();
  disabledDates: Date[] = [];
  currentUser: User | null | undefined;

  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/dashboard/home' };

  constructor(
    private doctorService: MedicService,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService,
    private appointmentsService: AppointmentsService,
  ) {
    this.items = [
      { label: 'Programar Cita', routerLink: '/patient/book-appointments' },
  /*    { label: 'Buscar Disponibilidad', routerLink: '/patient/my-appointments/search-availability' },*/
      { label: 'Sacar Cita' }
    ];

    // Configurar fechas mínimas/máximas iniciales
    this.setupInitialDates();
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.loadDoctors();
    this.disablePastDates();
  }

  setupInitialDates(): void {
    const today = new Date();
    this.minDate = today;

    // Establecer maxDate a 2 meses adelante
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 2);
    this.maxDate = nextMonth;
  }

  disablePastDates(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Deshabilitar días pasados
    this.disabledDates = [];
    for (let d = new Date(2020, 0, 1); d < today; d.setDate(d.getDate() + 1)) {
      this.disabledDates.push(new Date(d));
    }
  }

  loadWeek(): void {
    this.selectedPeriod = 'week';
    const today = new Date();
    this.minDate = today;

    // Establecer maxDate al final de esta semana
    const endOfWeek = new Date(today);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
    this.maxDate = endOfWeek;

    this.loadAvailableHours();
  }

  loadMonth(): void {
    this.selectedPeriod = 'month';
    const today = new Date();
    this.minDate = today;

    // Establecer maxDate al final de este mes
    this.maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.loadAvailableHours();
  }

  loadNextMonth(): void {
    this.selectedPeriod = 'next-month';
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    this.minDate = nextMonth;

    // Establecer maxDate al final del próximo mes
    this.maxDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);

    this.loadAvailableHours();
  }

  loadAvailableHours(): void {
    if (!this.selectedMedic || !this.selectedDate) return;

    const formattedDate = this.formatDate(this.selectedDate);
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

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }


  loadDoctors(): void {
    this.loading = true;
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.medics = data.map(medic => ({
          ...medic,
          code: this.generateDoctorCode(medic.full_name)
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading doctors', error);
        this.loading = false;
      }
    });
  }

  private generateDoctorCode(name: string): string {
    return name.substring(0, 3).toLowerCase();
  }

  navigateToSpecialtySearch() {
    this.router.navigate(['/patient/my-appointments/search-by-specialty']);
  }

  confirmAppointment(): void {
    if (!this.selectedMedic || !this.selectedDate || !this.selectedHour) return;

    this.loading = true;
    const formattedDate = this.formatDate(this.selectedDate);

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
        this.activeStep = 3;
        this.router.navigate(['/patient/my-appointments']);
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


  protected readonly environment = environment;
}
