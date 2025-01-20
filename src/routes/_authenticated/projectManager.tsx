import { createFileRoute, Outlet } from '@tanstack/react-router';

import CustomErrorComponent from '../../components/CustomErrorComponent';

export const Route = createFileRoute('/_authenticated/projectManager')({
  beforeLoad: ({ context }) => {
    if (context.auth.user?.role !== 'project_manager') {
      throw new Error('You are not authorized to access this page');
    }
  },

  component: ProjectManagerLayout,
  errorComponent: CustomErrorComponent,
  onError: (error) => {
    console.error(error);
  },
});

function ProjectManagerLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
