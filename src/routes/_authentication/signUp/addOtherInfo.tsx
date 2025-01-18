import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

import ErrorComponent from '../../../components/ErrorComponent';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../components/ui/Button';
import CustomErrorComponent from '../../../components/CustomErrorComponent';

import { AddOtherInfoCredentials } from '../../../types/userType';

import { useAuthMutation } from '../../../services/mutations/authMutations';

const initialValues: AddOtherInfoCredentials = {
  role: '',
};

type SearchParams = {
  email: string;
  googleId: string;
};

export const Route = createFileRoute('/_authentication/signUp/addOtherInfo')({
  validateSearch: (search: Record<string, string>): SearchParams => {
    return {
      email: search.email,
      googleId: search.googleId,
    };
  },
  loaderDeps: ({ search: { email, googleId } }) => ({ email, googleId }),
  beforeLoad: async ({ search }) => {
    if (!search.email || !search.googleId) {
      return redirect({ to: '/signUp' });
    }
  },
  component: AddOtherInfo,
  errorComponent: CustomErrorComponent,
  onError: (error) => {
    console.error(error);
  },
});

function AddOtherInfo() {
  const [formValues, setFormValues] =
    useState<AddOtherInfoCredentials>(initialValues);
  const [formError, setFormError] = useState<string | null>(null);
  const { email, googleId } = Route.useSearch();
  const { addUserOtherInfo } = useAuthMutation();
  const navigate = useNavigate();

  // Handle form changes
  const handleFormValues = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormError(null);

    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = (): boolean => {
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
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!validateForm()) {
      return;
    }
    addUserOtherInfo.mutate(
      {
        role: formValues.role,
        email,
        googleId,
      },
      {
        onSuccess: (data) => {
          if (data.user.role === 'project_manager') {
            navigate({ to: '/projectManager/managerOverview' });
          } else {
            navigate({ to: '/' });
          }
        },
      },
    );
    setFormValues(initialValues);
  };

  useEffect(() => {
    if (addUserOtherInfo.isError) {
      toast.error(addUserOtherInfo.error?.message || 'An error occurred');
    }
  }, [addUserOtherInfo.isError, addUserOtherInfo.error]);

  if (addUserOtherInfo.isError) {
    return (
      <ErrorComponent
        errorMessage={
          addUserOtherInfo.error.message
            ? addUserOtherInfo.error.message
            : 'An error occurred'
        }
        onRetry={addUserOtherInfo.reset}
      />
    );
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col pt-5 justify-center items-center">
        <h1 className="font-lexend text-3xl font-medium ">
          One more step to go...
        </h1>
        <form
          className="my-10  w-full md:w-3/4  lg:w-1/2 "
          onSubmit={onSubmitHandler}
        >
          <div className="form-control w-full ">
            <label className="label md:text-lg font-medium">
              Manger or Client?
            </label>
            <select
              className="select select-bordered"
              value={formValues.role}
              name="role"
              onChange={handleFormValues}
            >
              <option>Choose...</option>
              <option>project_manager</option>
              <option>client</option>
            </select>
          </div>
          <div className=" mt-5 flex flex-col md:flex-row gap-5 items-center">
            <Button
              className=" btn-primary"
              disabled={addUserOtherInfo.isPending}
            >
              {addUserOtherInfo.isPending ? 'loading...' : 'Continue'}
            </Button>
            {formError && (
              <p className="text-red-500 w-56 text-center">{formError}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
