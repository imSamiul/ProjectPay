import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import authenticationPageImage from "../assets/authentication-page-image.jpg";

export const Route = createFileRoute("/_authentication")({
  component: AuthenticationLayout,
  beforeLoad: async ({ context }) => {
    if (context.auth.isTokenSaved()) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function AuthenticationLayout() {
  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Outlet />
      </div>
      <div className="flex-1 ">
        <img
          src={authenticationPageImage}
          alt="authentication page image"
          className=" h-full w-full"
        />
      </div>
    </div>
  );
}
