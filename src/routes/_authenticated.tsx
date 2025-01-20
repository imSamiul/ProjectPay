import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import Navbar from '../components/ui/Navbar';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },

  component: AuthenticatedLayout,
});
function AuthenticatedLayout() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
