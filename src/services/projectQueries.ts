import { useQuery } from "@tanstack/react-query";
import { getProjectOverview } from "./apis";

export function useGetProjectOverview() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjectOverview,
  });
}
