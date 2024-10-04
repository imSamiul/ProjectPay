import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Navbar from "../components/ui/Navbar";
import { fetchUserDetails } from "../services/apis";

export const Route = createFileRoute("/_authenticated")({
  loader: async ({ context }) => {
    if (context.auth.isLogged()) {
      const data = await fetchUserDetails();
      context.auth.setUserDetails(data.user);
      return data.user;
    }
  },
  beforeLoad: ({ context }) => {
    if (!context.auth.isLogged()) {
      throw redirect({
        to: "/login",
      });
    }
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
