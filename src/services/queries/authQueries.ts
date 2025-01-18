import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../api/auth.api';
import { getAccessToken } from '../../utils/auth';

// Query for user data
export function useAuthQueries() {
  const getUserQuery = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getUser,
    retry: false,
    enabled: !!getAccessToken(),
    refetchOnWindowFocus: false,
  });
  const refreshTokenQuery = useQuery({
    queryKey: ['refreshToken'],
    queryFn: authApi.refreshToken,
    retry: false,
    enabled: !!getAccessToken(),
    refetchInterval: 1000 * 60 * 50, // 50 minutes
  });
  return { getUserQuery, refreshTokenQuery };
}
