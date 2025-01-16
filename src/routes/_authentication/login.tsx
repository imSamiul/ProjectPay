import { createFileRoute } from '@tanstack/react-router';
import { useLoginForm } from '../../hooks/useLoginForm';
import Button from '../../components/ui/Button';
import LinkButton from '../../components/ui/LinkButton';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import InputField from '../../components/ui/InputField';

export const Route = createFileRoute('/_authentication/login')({
  component: Login,
});

function Login() {
  const {
    formValues,
    handleFormValues,
    onSubmitHandler,
    formError,
    isError,
    error,
    isPending,
  } = useLoginForm();

  // Use useEffect to handle errors
  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'There is an error');
    }
  }, [isError, error]); // Only run when isError or error changes

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col pt-5 justify-center items-center">
        <h1 className="font-lexend text-3xl font-medium">Welcome back!</h1>
        <p className="font-lexend font-medium mt-2">
          Enter your Credentials to access your account
        </p>

        <form className="my-10 w-full md:w-1/2  " onSubmit={onSubmitHandler}>
          <InputField
            label="Email Address"
            type="text"
            placeholder="Your email address"
            value={formValues.email}
            name="email"
            onChange={handleFormValues}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Type here"
            value={formValues.password}
            name="password"
            onChange={handleFormValues}
            className="input input-bordered w-full "
          />

          <div className="mt-5 flex flex-col md:flex-row gap-5 items-center">
            <Button className=" btn-primary" disabled={isPending}>
              {isPending ? 'loading...' : 'Login'}
            </Button>
            {formError && (
              <p className="text-red-500 w-56 text-center">{formError}</p>
            )}
          </div>
        </form>

        <p className="font-medium text-center mb-5">
          Don't have an account?{' '}
          <LinkButton
            title="Sign Up"
            className="text-[#606c38] text-lg"
            to="/signUp"
          ></LinkButton>
        </p>
      </div>
    </div>
  );
}
