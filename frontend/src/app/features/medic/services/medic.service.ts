import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {Medic} from '../models/medic';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  private readonly API_URL = `${environment.apiUrl}/medics`;
  http = inject(HttpClient);
  user = inject(UserService);

  constructor() { }

  getDoctors(): Observable<Medic[]> {
    return this.http.get<Medic[]>(this.API_URL);
  }

  getMedic(): Observable<Medic> {
    const name = this.user.getCurrentUser();
    return this.http.get<Medic>(`${this.API_URL}/name/${name?.full_name}`);
  }

  updateProfile(profileData: {
    specialty: string;
    years_experience: number;
    presentation: string;
    profile_picture_url: string;
  }): Observable<any> {
    return this.http.put(`${this.API_URL}/update-profile`, profileData);
  }

  registerProfile(profileData: {
    specialty: string;
    years_experience: number;
    presentation: string;
    profile_picture_url: string;
  }): Observable<any> {
    return this.http.post(`${this.API_URL}/register-profile`, profileData);
  }

  uploadPhoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.API_URL}/upload-photo`, formData);
  }

}
