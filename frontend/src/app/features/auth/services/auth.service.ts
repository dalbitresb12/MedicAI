import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';

import { LoginRequest } from '../models/login-request.model';

import {environment} from '../../../../environments/environment';
import {User} from '../models/user.model';
import {AuthResponse} from '../models/auth-response.model';
import {RegisterRequest, RegisterResponse} from '../models/register.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly USER_KEY = 'currentUser';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => this.saveUser(response))
    );
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUser(): User | null {
    const userJson= localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  getToken(): string | null {
    const user = this.getCurrentUser();
    return user ? (user as any).access_token : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  private saveUser(authResponse: AuthResponse): void {

    const userData = {
      ...authResponse.userResponse,
      access_token: authResponse.access_token
    };
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
  }
}
