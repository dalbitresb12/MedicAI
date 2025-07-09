export enum UserRole {
  MEDIC = 'medic',
  ADMIN = 'admin',
  PATIENT = 'patient'
}

export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  enabled: boolean;
  role: UserRole;
}

