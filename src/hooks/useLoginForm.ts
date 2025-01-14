import * as EmailValidator from 'email-validator';
import { LoginCredentials } from '../types/auth.types';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const initialValues: LoginCredentials = {
  email: '',
  password: '',
};

export function useLoginForm() {
  const [formValues, setFormValues] = useState<LoginCredentials>(initialValues);
  const { login } = useAuth();

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
    if (formValues.email === '' || formValues.password === '') {
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
      setFormError('Password must be valid or at least 6 characters long');
      return false;
    }

    return true;
  };

  // Handle form submission
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      await login(formValues);
    }
  };

  return {
    formValues,
    handleFormValues,
    onSubmitHandler,
    formError,
  };
}
