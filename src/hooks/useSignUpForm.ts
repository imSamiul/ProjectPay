import { useState } from "react";

import * as EmailValidator from "email-validator";
import { SignUpFormType } from "../types/userType";
import { useCreateUser } from "../services/mutations/userMutations";

const initialValues: SignUpFormType = {
  name: "",
  email: "",
  password: "",
};

export function useSignUpForm() {
  const [formValues, setFormValues] = useState<SignUpFormType>(initialValues);
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
  const handleFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      formValues.password === ""
    ) {
      setFormError("Please fill all the fields");
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
