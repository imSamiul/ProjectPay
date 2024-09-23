import Button from "../components/ui/Button";
import LinkButton from "../components/ui/LinkButton";
import { useLoginForm } from "../hooks/useLoginForm";

function Login() {
  const { formValues, error, handleFormValues, onSubmitHandler } =
    useLoginForm();
  return (
    <div>
      <h1 className="font-lexend text-3xl font-medium">Welcome back!</h1>
      <p className="font-lexend font-medium mt-2">
        Enter your Credentials to access your account
      </p>
      <form className="my-10" onSubmit={onSubmitHandler}>
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
        <Button title="Login" classNames="mt-5 bg-[#283618] text-white" />
        {error && <p className="text-red-500 w-56">{error}</p>}
      </form>
      <p className="font-medium">
        Don't have an account?{" "}
        <LinkButton
          title="Sign Up"
          classNames="text-[#606c38] "
          to="/authentication/signUp"
        ></LinkButton>
      </p>
    </div>
  );
}

export default Login;
