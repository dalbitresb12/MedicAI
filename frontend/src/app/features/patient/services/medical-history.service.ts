import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MedicalHistory} from '../models/medical-history';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {
 // private apiUrl = 'http://127.0.0.1:8000/api/v1/history';
  private readonly API_URL = `${environment.apiUrl}/history`;

  constructor(private http: HttpClient) { }

  getPatientHistory(): Observable<MedicalHistory[]> {
    return this.http.get<MedicalHistory[]>(`${this.API_URL}/me`);
  }
}
