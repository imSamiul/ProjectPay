import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_projectManager")({
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
    console.log(context.auth.user);
    return context.auth.user;
  },
  component: ProjectManagerLayout,
  errorComponent: () => <div>Unauthorized</div>,
  onError: (error) => {
    console.error(error);
  },
});

function ProjectManagerLayout() {
  return (
    <div>
      <div>Hello /_authenticated/_projectManager!</div>,
      <Outlet />
    </div>
  );
}
