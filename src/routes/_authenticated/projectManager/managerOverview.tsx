import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/projectManager/managerOverview",
)({
  component: () => (
    <div>Hello /_authenticated/projectManager/managerOverview!</div>
  ),
});
