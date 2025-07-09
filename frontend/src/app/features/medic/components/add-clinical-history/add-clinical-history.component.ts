import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {HistoryClinicService} from '../../services/history-clinic.service';
import {HistoryClinic} from '../../models/history-clinic';
import {ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {Toast} from 'primeng/toast';
import {NgClass, NgIf} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'app-add-clinical-history',
  imports: [
    ButtonDirective,
    Card,
    Toast,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    InputText,
    Textarea
  ],
  templateUrl: './add-clinical-history.component.html',
  styleUrl: './add-clinical-history.component.scss'
})
export class AddClinicalHistoryComponent  implements OnInit {
  historyForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private historyService: HistoryClinicService,
    private messageService: MessageService
  ) {
    this.historyForm = this.fb.group({
      patient_email: ['', [Validators.required, Validators.email]],
      patient_full_name: ['', Validators.required],
      symptoms: ['', Validators.required],
      diagnosis: ['', Validators.required],
      medications: ['', Validators.required],
      treatment: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.historyForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.loading = true;
    const historyData: HistoryClinic = this.historyForm.value;

    this.historyService.createHistoryClinic(historyData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Historia clínica registrada correctamente'
        });
        this.historyForm.reset();
      },
      error: (error) => {
        console.error('Error creating history', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo registrar la historia clínica'
        });
      },
      complete: () => this.loading = false
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.historyForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
