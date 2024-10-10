import { useQuery } from "@tanstack/react-query";
import { getProjectDetails, searchProject } from "../projectApis";

export function useSearchProject(searchString: string) {
  return useQuery({
    queryKey: ["projects", searchString],
    queryFn: () => searchProject(searchString),
    enabled: !!searchString,
  });
}

export function useGetProjectDetails(projectCode: string) {
  return useQuery({
    queryKey: ["projects", projectCode],
    queryFn: () => getProjectDetails(projectCode),
    enabled: !!projectCode,
  });
}
