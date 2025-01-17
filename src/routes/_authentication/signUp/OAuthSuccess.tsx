import { createFileRoute } from '@tanstack/react-router';
import { setAccessToken } from '../../../utils/auth';
import { useEffect } from 'react';

type SearchParams = {
  accessToken: string;
};

export const Route = createFileRoute('/_authentication/signUp/OAuthSuccess')({
  validateSearch: (search: Record<string, string>): SearchParams => {
    return {
      accessToken: search.accessToken,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { accessToken } = Route.useSearch();
  const navigate = Route.useNavigate();
  useEffect(() => {
    if (accessToken) {
      console.log(accessToken);
      setAccessToken(accessToken);
      navigate({ to: '/' });
    }
  }, [accessToken, navigate]);
  return <div>There is an error</div>;
}
