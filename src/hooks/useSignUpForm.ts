import { useState } from 'react';

import * as EmailValidator from 'email-validator';
import { SignupCredentials } from '../types/auth.types';

import { useAuthMutation } from '../services/mutations/authMutations';

import { useNavigate } from '@tanstack/react-router';

const initialValues: SignupCredentials = {
  userName: '',
  email: '',
  password: '',
  role: '',
};

export function useSignUpForm() {
  const [formValues, setFormValues] =
    useState<SignupCredentials>(initialValues);
  const [formError, setFormError] = useState<string | null>(null);
  const { signupMutation } = useAuthMutation();
  const navigate = useNavigate();

  const { mutate, isError, error, isPending } = signupMutation;

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
      formValues.userName === '' ||
      formValues.email === '' ||
      formValues.password === ''
    ) {
      setFormError('Please fill all the fields');
      return false;
    }

    const isValidEmail = EmailValidator.validate(formValues.email);
    if (!isValidEmail) {
      setFormError('Email must be valid');
      return false;
    }

    if (
      formValues.password.length < 6 ||
      formValues.password.includes('password')
    ) {
      setFormError(
        "Password must be at least 6 characters long and should not contain the word 'password'",
      );
      return false;
    }
    if (
      formValues.role?.toLowerCase() !== 'client' &&
      formValues.role?.toLowerCase() !== 'project_manager'
    ) {
      setFormError('User type must be either client or project manager');
      return false;
    }

    return true;
  };

  // Handle form submission
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (validateForm()) {
      mutate(formValues, {
        onSuccess: (data) => {
          if (data.user.role === 'project_manager') {
            navigate({ to: '/projectManager/managerOverview' });
          }
        },
      });
    }
    return;
  };

  return {
    formValues,
    formError,
    handleFormValues,
    onSubmitHandler,
    isError,
    error,
    isPending,
  };
}
