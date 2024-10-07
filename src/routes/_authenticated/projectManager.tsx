import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/projectManager")({
  beforeLoad: async ({ context }) => {
    const user = context.auth.user; // Ensure you get the updated user value

    if (!user) {
      throw new Error("User not available in context");
    }

    if (user.userType !== "project-manager") {
      throw new Error("You are not authorized to access this page");
    }
  },
  loader: ({ context }) => {
    // console.log(context.auth.user);
    return context.auth.user;
  },
  component: ProjectManagerLayout,
  errorComponent: (error) => {
    console.log(error.error.message);
    return <div>There is an error </div>;
  },
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
