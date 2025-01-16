import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getProjectDetails, searchProject } from '../../api/project.api';
import { managerApi } from '../../api/manager.apis';

// get all projects for a manager
export function useGetManagerProjects() {
  return useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: managerApi.getManagerProjects,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
  });
}

export function useSearchProject(searchString: string) {
  return useQuery({
    queryKey: ['searchProjects', searchString],
    queryFn: () => searchProject(searchString),
    enabled: !!searchString,
  });
}

export function useGetProjectDetails(projectCode: string) {
  return useQuery({
    queryKey: ['projectDetails', projectCode],
    queryFn: () => getProjectDetails(projectCode),
    enabled: !!projectCode,
  });
}
