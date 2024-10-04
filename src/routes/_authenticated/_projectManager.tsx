import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_projectManager")({
  beforeLoad: ({ context }) => {
    console.log(context.auth);

    if (!context.auth.isLogged()) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: () => <div>Hello /_authenticated/_projectManager!</div>,
});
