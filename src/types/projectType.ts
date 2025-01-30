import { PaymentType } from './paymentType';
import { Client, ProjectManager } from './userType';

export type ProjectType = {
  _id?: string;
  projectCode?: string;
  name: string;
  budget: number;
  advance: number;
  due?: number;
  clientPhone: string;
  clientEmail: string;
  totalPaid?: number;
  startDate?: string;
  endDate: string;

  description: string;
  status?: boolean;
  projectManager: ProjectManager;
  approvedClientList: Client[];
  requestedClientList: Client[];
  paymentList: PaymentType[];
};

export type UpdateProjectStatusType = {
  projectCode: string;
  status: boolean;
};

export type UpdateProjectType = {
  projectCode: string;
  name: string;
  budget: number;
  advance: number;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  clientDetails: string;
  endDate: string;
  demoLink: string;
  typeOfWeb: string;
  description: string;
};

export type ProjectDeleteModalPropsType = {
  modalId: string;
  projectName: string;
  projectCode: string;
  projectId: string;
};
