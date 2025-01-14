import { useQuery } from '@tanstack/react-query';

// generate refresh token
export const useAccessToken = () => {
  return useQuery({
    queryKey: ['accessToken'],
    queryFn: fetchAccessToken,
    retry: false, // Avoid retrying on failure
    refetchOnWindowFocus: false, // Avoid refetching unnecessarily
    staleTime: 60 * 60 * 1000, // Match your access token expiration (e.g., 15 minutes)
  });
};
