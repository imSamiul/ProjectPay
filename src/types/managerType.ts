export type ManagerType = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: "projectManager";
  managerProjects?: string[];
};
