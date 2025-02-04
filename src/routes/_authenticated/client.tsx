import { createFileRoute, Outlet } from '@tanstack/react-router';
import CustomErrorComponent from '../../components/CustomErrorComponent';

export const Route = createFileRoute('/_authenticated/client')({
  beforeLoad: ({ context }) => {
    if (context.auth.user?.role !== 'client') {
      throw new Error('You are not authorized to access this page');
    }
  },
  component: RouteComponent,
  errorComponent: CustomErrorComponent,
  onError: (error) => {
    console.error(error);
  },
});

function RouteComponent() {
  return (
    <div className="my-5">
      <Outlet />
    </div>
  );
}
