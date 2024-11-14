export type UserType = {
  id?: string;
  name?: string;
  email: string;
  password: string;
  photo?: string;
  role?: "client" | "admin" | "project_manager";
};

export type SignUpFormType = {
  name: string;
  email: string;
  password: string;
};
export type LoginFormType = {
  email: string;
  password: string;
};

export type AddOtherInfoFormType = {
  phone: string;
  role: string;
};
