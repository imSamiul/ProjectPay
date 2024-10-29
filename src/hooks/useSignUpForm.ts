import { useState } from "react";
import { phone } from "phone";
import * as EmailValidator from "email-validator";
import { UserType } from "../types/userType";
import { useCreateUser } from "../services/mutations/userMutations";

const initialValues: UserType = {
  name: "",
  email: "",
  phone: "",
  password: "",
  userType: "client",
};

export function useSignUpForm() {
  const [formValues, setFormValues] = useState<UserType>(initialValues);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    mutate: createUser,
    isError: isCreateUserError,
    error: createUserError,
    isSuccess: isCreateUserSuccess,
    isPending: isCreateUserPending,
    reset: resetCreateUser,
  } = useCreateUser();

  // Handle form changes
  const handleFormValues = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormError(null);
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  // Form validation logic
  const validateForm = (): boolean => {
    if (
      formValues.name === "" ||
      formValues.email === "" ||
      formValues.phone === "" ||
      formValues.password === ""
    ) {
      setFormError("Please fill all the fields");
      return false;
    }

    const phoneNum = "+880" + formValues.phone;
    const isValidPhone = phone(phoneNum);

    if (!isValidPhone.isValid) {
      setFormError("Phone no must be valid");
      return false;
    }
    if (formValues.phone?.length !== 10) {
      setFormError("Phone no must be 10 digit");
      return false;
    }

    const isValidEmail = EmailValidator.validate(formValues.email);
    if (!isValidEmail) {
      setFormError("Email must be valid");
      return false;
    }

    if (
      formValues.password.length < 6 ||
      formValues.password.includes("password")
    ) {
      setFormError(
        "Password must be at least 6 characters long and should not contain the word 'password'",
      );
      return false;
    }
    if (
      formValues.userType?.toLowerCase() !== "client" &&
      formValues.userType?.toLowerCase() !== "project manager"
    ) {
      setFormError("User type must be either client or project manager");
      return false;
    }

    return true;
  };

  // Handle form submission
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!validateForm()) {
      return;
    }

    createUser(formValues);
    setFormValues(initialValues);
  };

  return {
    formValues,
    formError,
    handleFormValues,
    onSubmitHandler,
    isCreateUserError,
    createUserError,
    isCreateUserSuccess,
    isCreateUserPending,
    resetCreateUser,
  };
}
