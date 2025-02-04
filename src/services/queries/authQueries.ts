import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../api/auth.api';

import { getLocalAccessToken } from '../../utils/auth';

// Query for user data
export function useAuthQueries() {
  const getUserQuery = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getUser,
    retry: false,
    enabled: !!getLocalAccessToken(),
    refetchOnWindowFocus: false,
  });
  const refreshTokenQuery = useQuery({
    queryKey: ['refreshToken'],
    queryFn: authApi.refreshToken,
    retry: false,
    enabled: !!getLocalAccessToken(),
    refetchInterval: 1000 * 60 * 60 * 23, // 24 hours
  });
  return { getUserQuery, refreshTokenQuery };
}
