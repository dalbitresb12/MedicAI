import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../core/services/user.service';
import {Observable} from 'rxjs';
import {Medic} from '../../medic/models/medic';
import {User} from '../../auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getAvailableHours(medicId: number, date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointments/schedule/${medicId}/${date}`);
  }

  getMyAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments/my`);
  }

  deleteAppointment(appointmentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/appointments/my/${appointmentId}`);
  }

  createAppointment(medic: Medic, date: string, hour: string): Observable<any> {
    const user = this.userService.getCurrentUser();
    const formattedHour = this.formatTimeForAPI(hour);


    const appointmentData = {
      medic_id: medic.id,
      patient_age: this.calculateAge('1999:02:10'), // Asumiendo que tienes esta info
      day: date,
      hour: formattedHour,
      patient_email: user?.email,
      patient_full_name: user?.full_name,
      medic_full_name: medic.full_name,
      specialty: medic.specialty
    };

    return this.http.post(`${this.apiUrl}/appointments/create`, appointmentData);
  }

  private formatTimeForAPI(time: string): string {
    const [h, m] = time.split(':').map(Number);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00.109Z`;
  }

  private calculateAge(birthDate: string): number {
    if (!birthDate) return 0;
    const birth = new Date(birthDate);
    const diff = Date.now() - birth.getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  }
}
