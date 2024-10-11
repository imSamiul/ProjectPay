import { ManagerType } from "./managerType";

export type ProjectType = {
  _id?: string;
  projectCode: string;
  name: string;
  budget: number | undefined;
  advance: number | undefined;
  due?: number | undefined;
  client: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  clientDetails: string;
  startDate: string;
  endDate: string;
  demoLink: string;
  typeOfWeb: string;
  description: string;
  status: boolean;
  projectManager: ManagerType;
  verifiedClientList?: string[];
};
