import { useState } from "react";
import { UserType } from "../types/userType";
import { useLoginUser } from "../services/mutations/userMutations";
import * as EmailValidator from "email-validator";

const initialValues: UserType = {
  email: "",
  password: "",
};

export function useLoginForm() {
  const [formValues, setFormValues] = useState<UserType>(initialValues);
  const { error, isError, isPending, mutate, isSuccess } = useLoginUser();

  const [formError, setFormError] = useState<string | null>(null);

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
    if (formValues.email === "" || formValues.password === "") {
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
      setFormError("Password must be valid");
      return false;
    }

    return true;
  };

  // Handle form submission
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      mutate(formValues);
    }
  };

  return {
    formValues,
    handleFormValues,
    onSubmitHandler,
    formError,
    isError,
    error,
    isPending,
    isSuccess,
  };
}
