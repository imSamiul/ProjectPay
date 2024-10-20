import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/project/edit/$projectCode",
)({
  component: () => <div>Hello /_authenticated/project/$projectCode/edit!</div>,
});
