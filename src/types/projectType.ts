export type ProjectType = {
  name: string;
  budget: number | undefined;
  advance: number | undefined;
  due: number | undefined;
  client: string;
  clientPhone: string;
  clientEmail: string;
  startDate: string;
  endDate: string;
  description: string;
  status: boolean;
  verifiedClientList?: string[];
};
