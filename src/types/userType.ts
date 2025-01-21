import { User } from './auth.types';

export type SignUpForm = {
  name: string;
  email: string;
  password: string;
  role: string;
};
export type LoginForm = {
  email: string;
  password: string;
};

export type AddOtherInfoCredentials = {
  role: string;
};
export type ProjectManager = User & {
  managerProjects: string[];
  clientList: string[];
};
export type Client = User & {
  clientProjects: string[];
  hasProjectInvitation: boolean;
  projectInvitations: string[];
};
