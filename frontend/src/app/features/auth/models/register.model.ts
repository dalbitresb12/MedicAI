export interface RegisterRequest {
  username: string;
  email: string;
  full_name: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  full_name: string;
  created_at: string;
}
