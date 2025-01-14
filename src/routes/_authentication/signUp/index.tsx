import { createFileRoute } from "@tanstack/react-router";
import { useSignUpForm } from "../../../hooks/useSignUpForm";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ErrorComponent from "../../../components/ErrorComponent";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import LinkButton from "../../../components/ui/LinkButton";

export const Route = createFileRoute("/_authentication/signUp/")({
  component: SignUp,
});
function SignUp() {
  const {
    formValues,
    formError,
    handleFormValues,
    onSubmitHandler,
    createUserError,
    isCreateUserError,
    isCreateUserPending,
    isCreateUserSuccess,
    resetCreateUser,
  } = useSignUpForm();

  useEffect(() => {
    if (isCreateUserSuccess) {
      toast.success("User created successfully");
    }
    if (isCreateUserError) {
      toast.error(createUserError?.message || "An error occurred");
    }
  }, [isCreateUserSuccess, isCreateUserError, createUserError]);

  if (isCreateUserError) {
    return (
      <ErrorComponent
        errorMessage={
          createUserError ? createUserError.message : "An error occurred"
        }
        onRetry={resetCreateUser}
      />
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col pt-5 justify-center items-center">
        <h1 className="font-lexend text-3xl font-medium ">Get Started Now</h1>

        <form
          className="my-10  w-full md:w-3/4  lg:w-1/2 "
          onSubmit={onSubmitHandler}
        >
          <InputField
            label="Name"
            type="text"
            placeholder="Your name"
            value={formValues.name}
            name="name"
            onChange={handleFormValues}
          />

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
          />
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
            <Button className=" btn-primary" disabled={isCreateUserPending}>
              {isCreateUserPending ? "Creating...." : "SignUp"}
            </Button>
            {formError && (
              <p className="text-red-500 w-56 text-center">{formError}</p>
            )}
          </div>
        </form>
      </div>
      <p className="font-medium text-center mb-5">
        Already have an account?{" "}
        <LinkButton
          title="Login"
          className="text-[#606c38] text-lg"
          to="/login"
        ></LinkButton>
      </p>
    </div>
  );
}
