import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';


import { MessageService } from 'primeng/api';
import {Router, RouterLink} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {DropdownModule} from 'primeng/dropdown';
import {InputText} from 'primeng/inputtext';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {Password} from 'primeng/password';
import {Checkbox} from 'primeng/checkbox';
import {Button, ButtonDirective} from 'primeng/button';
import {Toast} from 'primeng/toast';
import {LoginRequest} from '../../models/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    InputText,
    NgIf,
    Toast,
    NgClass,
    Button,
    NgOptimizedImage,
    RouterLink
  ],
  providers: [MessageService]
})

export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  logoUrl = 'assets/logo/logo.jpg';
  logoAlt = 'MedicAI logo';


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const credentials: LoginRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/home']);
      },
      error: (error) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid email or password',
          life: 3000
        });
      }
    });
  }
}
