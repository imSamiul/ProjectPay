import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/test2")({
  component: () => <div>Hello /_authenticated/test2!</div>,
});
