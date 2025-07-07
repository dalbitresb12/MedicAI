export interface HistoryClinic {
  id?: number;
  patient_email: string;
  patient_full_name: string;
  symptoms: string;
  diagnosis: string;
  medications: string;
  treatment: string;
  created_at?: string;
  updated_at?: string;
  medic_id?: number;
}
