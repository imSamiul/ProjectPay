import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/projectManager/overview")(
  {
    component: Overview,
  },
);

function Overview() {
  return <div>Overview</div>;
}
