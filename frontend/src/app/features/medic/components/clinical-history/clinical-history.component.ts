import { Component } from '@angular/core';
import {HistoryClinicService} from '../../services/history-clinic.service';
import {HistoryClinic} from '../../models/history-clinic';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {ProgressSpinner} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {DatePipe, NgIf} from '@angular/common';

interface SearchOption {
  name: string;
  value: 'email' | 'name';
}

@Component({
  selector: 'app-clinical-history',
  imports: [
    DropdownModule,
    FormsModule,
    InputText,
    ButtonDirective,
    ProgressSpinner,
    TableModule,
    NgIf,
    DatePipe
  ],
  templateUrl: './clinical-history.component.html',
  styleUrl: './clinical-history.component.scss'
})
export class ClinicalHistoryComponent {
  searchType: SearchOption = { name: 'Email del paciente', value: 'email' };
  searchOptions: SearchOption[] = [
    { name: 'Email del paciente', value: 'email' },
    { name: 'Nombre del paciente', value: 'name' }
  ];

  searchTerm = '';
  histories: HistoryClinic[] = [];
  loading = false;
  error = '';
  searched = false;

  constructor(private historyService: HistoryClinicService) {}

  searchHistories() {
    if (!this.searchTerm) return;

    this.loading = true;
    this.error = '';
    this.histories = [];
    this.searched = true;

    const searchObservable = this.searchType.value === 'email'
      ? this.historyService.getHistoriesByPatient(this.searchTerm)
      : this.historyService.getHistoriesByMedic(this.searchTerm);

    searchObservable.subscribe({
      next: (data) => {
        this.histories = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las historias clínicas. Por favor, intente nuevamente.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  clearResults() {
    this.histories = [];
    this.error = '';
    this.searched = false;
  }

}
