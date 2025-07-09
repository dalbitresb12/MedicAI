import {Component, OnInit} from '@angular/core';
import {MedicalHistory} from '../../models/medical-history';
import {MedicalHistoryService} from '../../services/medical-history.service';
import {MessageService} from 'primeng/api';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Toast} from 'primeng/toast';
import {Tag} from 'primeng/tag';
import {DatePipe} from '@angular/common';
import {Calendar} from 'primeng/calendar';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Button, ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-medical-history',
  imports: [
    ProgressSpinner,
    Toast,
    Tag,
    Calendar,
    FormsModule,
    InputText,
    ButtonDirective,
    Button
  ],
  templateUrl: './medical-history.component.html',
  styleUrl: './medical-history.component.scss'
})
export class MedicalHistoryComponent implements OnInit {
  histories: MedicalHistory[] = [];
  filteredHistories: MedicalHistory[] = [];
  loading = false;
  searchQuery = '';
  dateRange: Date[] | undefined;

  constructor(
    private medicalHistoryService: MedicalHistoryService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadMedicalHistories();
  }

  loadMedicalHistories(): void {
    this.loading = true;
    this.medicalHistoryService.getPatientHistory().subscribe({
      next: (data) => {
        this.histories = data;
        this.filteredHistories = [...data];
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el historial médico'
        });
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredHistories = this.histories.filter(history => {
      // Filtro por texto
      const textMatch = this.searchQuery === '' ||
        history.symptoms.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        history.diagnosis.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        history.medications.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        history.treatment.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Filtro por fecha
      let dateMatch = true;
      if (this.dateRange && this.dateRange.length === 2) {
        const historyDate = new Date(history.created_at);
        const startDate = new Date(this.dateRange[0]);
        const endDate = new Date(this.dateRange[1]);
        endDate.setHours(23, 59, 59, 999);

        dateMatch = historyDate >= startDate && historyDate <= endDate;
      }

      return textMatch && dateMatch;
    });
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.dateRange = undefined;
    this.filteredHistories = [...this.histories];
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
