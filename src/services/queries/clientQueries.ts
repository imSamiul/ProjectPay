import { useQuery } from '@tanstack/react-query';
import { clientApi } from '../../api/client.api';

export function useSearchClient(searchQuery: string) {
  return useQuery({
    queryKey: ['clientSearch', searchQuery],
    queryFn: () => clientApi.searchClient(searchQuery),
    enabled: !!searchQuery,
  });
}
