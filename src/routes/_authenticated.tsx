import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Navbar from "../components/ui/Navbar";
import { fetchUserDetails } from "../services/userApis";

export const Route = createFileRoute("/_authenticated")({
  loader: async ({ context }) => {
    const isTokenSaved = context.auth.isTokenSaved();
    if (!isTokenSaved) {
      throw redirect({
        to: "/login",
      });
    }

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
