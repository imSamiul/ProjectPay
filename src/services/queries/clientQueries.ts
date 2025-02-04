import { useQuery } from '@tanstack/react-query';
import { clientApi } from '../../api/client.api';

export function useSearchClient(searchQuery: string) {
  return useQuery({
    queryKey: ['clientSearch', searchQuery],
    queryFn: () => clientApi.searchClient(searchQuery),
    enabled: !!searchQuery,
    gcTime: 1000 * 60, // 60 seconds
  });
}

export function useGetClientProjects() {
  return useQuery({
    queryKey: ['clientProjects'],
    queryFn: () => clientApi.getClientProjects(),
  });
}

export function useGetRequestedProjects() {
  return useQuery({
    queryKey: ['requestedProjects'],
    queryFn: () => clientApi.getRequestedProjects(),
  });
}
