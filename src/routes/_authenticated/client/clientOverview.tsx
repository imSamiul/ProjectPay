import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/client/clientOverview')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
