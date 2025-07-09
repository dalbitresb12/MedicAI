import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HistoryClinic} from '../models/history-clinic';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryClinicService {
  private readonly API_URL = `${environment.apiUrl}/history`;

  constructor(private http: HttpClient) {}

  createHistoryClinic(history: HistoryClinic): Observable<HistoryClinic> {
    return this.http.post<HistoryClinic>(this.API_URL, history);
  }

  getHistoriesByPatient(email: string): Observable<HistoryClinic[]> {
    return this.http.get<HistoryClinic[]>(`${this.API_URL}/by-patient-email/${email}`);
  }

  getHistoriesByMedic(name: string): Observable<HistoryClinic[]> {
    return this.http.get<HistoryClinic[]>(`${this.API_URL}/by-patient-name/${name}`);
  }
}
