import { User } from './auth.types';
import { ProjectType } from './projectType';

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
  clientId: string;
  clientProjects: ProjectType[];
  hasProjectInvitation: boolean;
  projectInvitations: ProjectType[];
};
