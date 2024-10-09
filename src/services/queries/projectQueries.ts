// export function useGetAllProjects() {
//   return useInfiniteQuery({
//     queryKey: ["projects"],
//     queryFn: getAllProjects,
//     initialPageParam: 0,
//     getNextPageParam: (lastResult) => lastResult.nextPage,
//     getPreviousPageParam: (lastResult) => lastResult.previousPage,
//   });
// }

import { useQuery } from "@tanstack/react-query";
import { searchProject } from "../projectApis";

// export const useGetAllProjects = infiniteQueryOptions({
//   queryKey: ["projects"],
//   queryFn: getAllProjects,
//   initialPageParam: 0,

//   getNextPageParam: (lastPage, allPages) => {
//     return lastPage.length === 0 ? undefined : allPages.length + 1;
//   },
// });

export function useSearchProject(searchString: string) {
  return useQuery({
    queryKey: ["projects", searchString],
    queryFn: () => searchProject(searchString),
    enabled: !!searchString,
  });
}
