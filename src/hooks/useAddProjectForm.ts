import { useState } from 'react';
import { ProjectType } from '../types/projectType';

import * as EmailValidator from 'email-validator';
import { useCreateNewProject } from '../services/mutations/projectMutation';

const initialProject: ProjectType = {
  name: '',
  budget: 0,
  advance: 0,
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  clientAddress: '',
  clientDetails: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  demoLink: '',
  typeOfWeb: '',
  description: '',
  status: false,
};

export function useProjectForm() {
  const [project, setProject] = useState<ProjectType>(initialProject);
  const [error, setError] = useState<string | null>(null);

  const createNewProjectMutation = useCreateNewProject();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setError(null);
    const { name, value } = e.target;
    setProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (
      project.name === '' ||
      project.budget === undefined ||
      project.advance === undefined ||
      project.clientName === '' ||
      project.clientPhone === '' ||
      project.clientEmail === '' ||
      project.startDate === '' ||
      project.endDate === ''
    ) {
      setError('All fields must be filled.');
      return false;
    }

    if (Number(project.advance) > Number(project.budget)) {
      setError('Advance cannot exceed the total budget.');
      return false;
    }

    // check if phone number is valid
    //TODO: check if phone number is valid

    const isValidEmail = EmailValidator.validate(project.clientEmail);
    if (!isValidEmail) {
      setError('Client email must be valid.');
      return false;
    }

    return true;
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    createNewProjectMutation.mutate(project);

    // Add logic to handle form submission (e.g., mutation, API call, etc.)

    setProject(initialProject); // Reset form after successful submission
  };

  return {
    project,
    error,
    handleInputChange,
    onSubmitHandler,
  };
}
