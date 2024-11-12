import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Navbar from "../components/ui/Navbar";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    const isTokenSaved = context.auth.isTokenSaved();
    if (!isTokenSaved) {
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
