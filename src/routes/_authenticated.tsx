import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Navbar from "../components/ui/Navbar";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    console.log(context.auth);

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
