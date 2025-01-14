import { createFileRoute, Outlet } from '@tanstack/react-router';
import authenticationPageImage from '../assets/authentication-page-image.jpg';
import { redirect } from '@tanstack/react-router';
import Button from '../components/ui/Button';

export const Route = createFileRoute('/_authentication')({
  component: AuthenticationLayout,
  beforeLoad: async ({ context }) => {
    if (context.auth.isAuthenticated) {
      if (context.auth.user?.role === 'project_manager') {
        return redirect({ to: '/projectManager/managerOverview' });
      } else {
        return redirect({ to: '/' });
      }
    }
  },
});

function handleGoogleSignUp() {
  window.location.href = `${import.meta.env.VITE_BASE_URL}/api/auth/login`;
}

function AuthenticationLayout() {
  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Outlet />
        <Button onClick={handleGoogleSignUp}>Sign Up with google</Button>
      </div>
      <div className="flex-1 ">
        <img
          src={authenticationPageImage}
          alt="authentication page image"
          className=" h-full w-full"
        />
      </div>
    </div>
  );
}
