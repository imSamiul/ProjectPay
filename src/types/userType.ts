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

export type AddOtherInfoForm = {
  phone: string;
  role: string;
  temporaryToken: string;
};
