export interface User {
  id: number;
  name: string;
  pseudo: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  pseudo: string;
  password: string;
  confirmPassword: string;
}
