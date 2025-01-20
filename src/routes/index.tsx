import { createFileRoute, redirect } from '@tanstack/react-router';
import Navbar from '../components/ui/Navbar';

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    if (context.auth.isAuthenticated) {
      if (context.auth.user?.role === 'project_manager') {
        throw redirect({
          to: '/projectManager/managerOverview',
        });
      } else if (context.auth.user?.role === 'client') {
        throw redirect({
          to: '/client/clientOverview',
        });
      }
    }
  },
  component: HomeLayout,
});

function HomeLayout() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
