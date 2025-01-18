import { createFileRoute } from '@tanstack/react-router';

import { useEffect } from 'react';
import { saveLocalAccessToken } from '../../../utils/auth';

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
      saveLocalAccessToken(accessToken);
      navigate({ to: '/' });
    }
  }, [accessToken, navigate]);
  return <div>There is an error</div>;
}
