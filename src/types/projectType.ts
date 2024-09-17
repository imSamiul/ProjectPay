type Payment = {
  id: number;
  amount: number;
  date: string;
};

type TeamMember = {
  id: number;
  name: string;
  role: string;
};

export type ProjectType = {
  id: number;
  name: string;
  budget: number;
  advance: number;
  due: number;
  payment: Payment[];
  projectNo: string;
  client: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
  team: TeamMember[];
  clientPhone: string;
  clientEmail: string;
};
