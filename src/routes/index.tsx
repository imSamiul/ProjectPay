import { createFileRoute, redirect } from "@tanstack/react-router";
import Navbar from "../components/ui/Navbar";
import { getRole } from "../utils/role";

export const Route = createFileRoute("/")({
  // beforeLoad: async ({ context }) => {
  //   const isTokenSaved = context.auth.isTokenSaved();

  //   if (isTokenSaved) {
  //     if (getRole() === "project_manager") {
  //       throw redirect({
  //         to: "/projectManager/managerOverview",
  //       });
  //     }
  //     // TODO: Add navigation for client
  //   }
  // },
  component: HomeLayout,
});

function HomeLayout() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
