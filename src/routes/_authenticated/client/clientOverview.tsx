import { createFileRoute } from '@tanstack/react-router';
import SearchProject from '../../../components/clientOverview/searchProject';

export const Route = createFileRoute('/_authenticated/client/clientOverview')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SearchProject />
    </div>
  );
}
