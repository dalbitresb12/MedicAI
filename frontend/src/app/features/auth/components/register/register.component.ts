// register.component.ts
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../models/register.model';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ToastModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  logoAlt = 'Logo de la aplicación';
  showPassword = false;

  userData = signal<RegisterRequest>({
    username: '',
    email: '',
    full_name: '',
    password: ''
  });

  loading = signal(false);

  onSubmit(): void {
    if (this.loading()) return;

    this.loading.set(true);

    this.authService.register(this.userData()).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: 'Cuenta creada correctamente'
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error en registro',
          detail: error.error.message || 'Error al crear la cuenta'
        });
        this.loading.set(false);
      }
    });
  }
}
