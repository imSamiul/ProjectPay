import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Navbar from "../components/ui/Navbar";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    console.log(context.auth);

    if (!context.auth.isLogged) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: AuthenticatedLayout,
});
function AuthenticatedLayout() {
  const navItem = [
    {
      title: "Overview",
      link: "/",
    },
    {
      title: "Add Clients",
      link: "/add-clients",
    },
    {
      title: "Client List",
      link: "/client-list",
    },
  ];
  return (
    <div>
      <Navbar navItem={navItem} />
      <Outlet />
    </div>
  );
}
