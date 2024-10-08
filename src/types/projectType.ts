export type ProjectType = {
  _id?: string;
  projectId: string;
  name: string;
  budget: number | undefined;
  advance: number | undefined;

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
  verifiedClientList?: string[];
};
