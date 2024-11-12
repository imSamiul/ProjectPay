import { createFileRoute, Outlet } from "@tanstack/react-router";

import { getRole } from "../../utils/role";

import CustomErrorComponent from "../../components/CustomErrorComponent";

export const Route = createFileRoute("/_authenticated/projectManager")({
  beforeLoad: () => {
    if (getRole() !== "project_manager") {
      throw new Error("You are not authorized to access this page");
    }
  },

  component: ProjectManagerLayout,
  errorComponent: CustomErrorComponent,
  onError: (error) => {
    console.error(error);
  },
});

function ProjectManagerLayout() {
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
}
