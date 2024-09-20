export type UserType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: "Client" | "Admin" | "Project-Manager";
};
