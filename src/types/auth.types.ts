export type User = {
  _id?: string;
  userName?: string;
  email: string;
  photo?: string;
  role?: 'client' | 'admin' | 'project_manager';
};
export type AuthResponse = {
  user: User;
  accessToken: string;
};
export type LoginCredentials = {
  email: string;
  password: string;
};
export type SignupCredentials = {
  name: string;
  email: string;
  password: string;
  role: string;
};
