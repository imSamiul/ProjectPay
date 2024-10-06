import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { getAllProjects } from "../projectApis";

// export function useGetAllProjects() {
//   return useInfiniteQuery({
//     queryKey: ["projects"],
//     queryFn: getAllProjects,
//     initialPageParam: 0,
//     getNextPageParam: (lastResult) => lastResult.nextPage,
//     getPreviousPageParam: (lastResult) => lastResult.previousPage,
//   });
// }

export const useGetAllProjects = infiniteQueryOptions({
  queryKey: ["projects"],
  queryFn: getAllProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.length === 0 ? undefined : allPages.length + 1;
  },
});
