import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Navbar from "../components/ui/Navbar";
import { fetchUserDetails } from "../services/userApis";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLogged()) {
      throw redirect({
        to: "/login",
      });
    }
    console.log("User is logged in");

    const data = await fetchUserDetails();
    context.auth.user = data.user;
  },

  component: AuthenticatedLayout,
});
function AuthenticatedLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
