import { ManagerType } from "./managerType";

export type ProjectType = {
  _id?: string;
  projectCode?: string;
  name: string;
  budget: number;
  advance: number;
  due?: number;
  totalPaid?: number;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  clientDetails: string;
  startDate?: string;
  endDate: string;
  demoLink: string;
  typeOfWeb: string;
  description: string;
  status?: boolean;
  projectManager?: ManagerType;
  verifiedClientList?: string[];
};

export type updateProjectStatusType = {
  projectCode: string;
  status: boolean;
};
