import {Component, OnInit} from '@angular/core';
import {AppointmentsService} from '../../services/appointments.service';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Calendar} from 'primeng/calendar';
import {Tooltip} from 'primeng/tooltip';
import {Card} from 'primeng/card';
import {ButtonDirective} from 'primeng/button';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-my-appointment',
  imports: [
    FormsModule,
    InputText,
    Calendar,
    Tooltip,
    ButtonDirective,
    ConfirmDialog
  ],
  templateUrl: './my-appointment.component.html',
  styleUrl: './my-appointment.component.scss',
  providers: [DatePipe, ConfirmationService, MessageService],

})
export class MyAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  searchTerm: string = '';
  startDate: string | null = null;
  endDate: string | null = null;

  constructor(
    private appointmentsService: AppointmentsService,
    private datePipe: DatePipe,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentsService.getMyAppointments().subscribe({
      next: (data) => {
        console.log(data);
        this.appointments = data;
        this.filteredAppointments = [...data];
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
      }
    });
  }

  applyFilters(): void {
    this.filteredAppointments = this.appointments.filter(appointment => {
      // Filtro por término de búsqueda
      const searchTerm = this.searchTerm.toLowerCase();
      const matchesSearch = !this.searchTerm ||
        appointment.patient_email.toLowerCase().includes(searchTerm) ||
        appointment.patient_full_name.toLowerCase().includes(searchTerm) ||
        appointment.medic_full_name.toLowerCase().includes(searchTerm) ||
        appointment.specialty.toLowerCase().includes(searchTerm);

      // Filtro por rango de fechas
      let matchesDate = true;
      if (this.startDate || this.endDate) {
        const appointmentDate = new Date(appointment.day);
        const start = this.startDate ? new Date(this.startDate) : null;
        const end = this.endDate ? new Date(this.endDate) : null;

        matchesDate = (!start || appointmentDate >= start) &&
          (!end || appointmentDate <= end);
      }

      return matchesSearch && matchesDate;
    });
  }

  formatTime(timeString: string): string {
    if (!timeString) return '';
    const date = new Date(`1970-01-01T${timeString}`);
    return this.datePipe.transform(date, 'HH:mm:ss') || '';
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.startDate = null;
    this.endDate = null;
    this.filteredAppointments = [...this.appointments];
  }
  confirmDelete(appointmentId: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar esta cita programada?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.deleteAppointment(appointmentId);
      }
    });
  }

  deleteAppointment(appointmentId: number): void {
    this.appointmentsService.deleteAppointment(appointmentId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cita eliminada correctamente'
        });
        this.loadAppointments(); // Recargar la lista
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la cita'
        });
        console.error('Error deleting appointment:', error);
      }
    });
  }
}
