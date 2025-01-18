import { createFileRoute } from '@tanstack/react-router';

import { useEffect } from 'react';
import { saveLocalAccessToken } from '../../../utils/auth';
import { useAuth } from '../../../context/AuthContext';

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
  const auth = useAuth();
  useEffect(() => {
    if (accessToken) {
      saveLocalAccessToken(accessToken);
      auth.saveAccessToken(accessToken);
      navigate({ to: '/' });
    }
  }, [accessToken, navigate]);
  return <div>There is an error</div>;
}
