import { createFileRoute } from "@tanstack/react-router";
import { useSignUpForm } from "../../hooks/useSignUpForm";
import Button from "../../components/ui/Button";
import LinkButton from "../../components/ui/LinkButton";

export const Route = createFileRoute("/_authentication/signUp")({
  component: SignUp,
});

function SignUp() {
  const { formValues, error, handleFormValues, onSubmitHandler } =
    useSignUpForm();

  return (
    <div>
      <h1 className="font-lexend text-3xl font-medium">Get Started Now</h1>

      <form className="my-10" onSubmit={onSubmitHandler}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-lexend">Name:</span>
          </div>
          <input
            type="text"
            placeholder="Your name"
            value={formValues.name}
            name="name"
            onChange={handleFormValues}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
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
            <span className="label-text font-lexend">Phone:</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>(+880)</p>
            <input
              type="text"
              placeholder="Your phone number"
              value={formValues.phone}
              name="phone"
              minLength={10}
              maxLength={10}
              onChange={handleFormValues}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
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
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-lexend">Manger or Client?</span>
          </div>
          <select
            className="select select-bordered"
            value={formValues.userType}
            name="userType"
            onChange={handleFormValues}
          >
            <option>Project Manager</option>
            <option>Client</option>
          </select>
        </label>
        <Button className="mt-5">Sign Up</Button>
        {error && <p className="text-red-500 w-56">{error}</p>}
      </form>
      <p className="font-medium">
        Already have an account?
        <LinkButton
          title="Login"
          classNames="text-[#606c38] "
          to="/login"
        ></LinkButton>
      </p>
    </div>
  );
}
