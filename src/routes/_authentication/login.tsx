import { createFileRoute } from "@tanstack/react-router";
import { useLoginForm } from "../../hooks/useLoginForm";
import Button from "../../components/ui/Button";
import LinkButton from "../../components/ui/LinkButton";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const Route = createFileRoute("/_authentication/login")({
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
    isSuccess,
  } = useLoginForm();

  // Use useEffect to handle errors
  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "There is an error");
    }
    if (isSuccess) {
      toast.success("Login Successful");
    }
  }, [isError, error, isSuccess]); // Only run when isError or error changes

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col pt-5 justify-center items-center">
        <h1 className="font-lexend text-3xl font-medium">Welcome back!</h1>
        <p className="font-lexend font-medium mt-2">
          Enter your Credentials to access your account
        </p>

        <form
          className="my-10 w-full md:w-3/4 md:flex md:flex-col md:items-center"
          onSubmit={onSubmitHandler}
        >
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-lexend">Email Address:</span>
            </div>
            <input
              type="text"
              placeholder="Your email address"
              value={formValues.email}
              name="email"
              onChange={handleFormValues}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-lexend">Password:</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              value={formValues.password}
              name="password"
              onChange={handleFormValues}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <Button className="mt-5 btn-primary" disabled={isPending}>
            {isPending ? "loading..." : "Login"}
          </Button>
          {formError && (
            <p className="text-red-500 w-56 text-center">{formError}</p>
          )}
        </form>

        <p className="font-medium text-center">
          Don't have an account?{" "}
          <LinkButton
            title="Sign Up"
            className="text-[#606c38]"
            to="/signUp"
          ></LinkButton>
        </p>
      </div>
    </div>
  );
}
