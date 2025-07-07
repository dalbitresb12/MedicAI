export interface MedicalHistory {
  id: number;
  patient_email: string;
  patient_full_name: string;
  medic_id: number;
  medic_full_name: string;
  symptoms: string;
  diagnosis: string;
  medications: string;
  treatment: string;
  created_at: string;
}

export interface MedicalHistoryResponse {
  histories: MedicalHistory[];
}
