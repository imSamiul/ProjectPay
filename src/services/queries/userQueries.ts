import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "../userApis";

export function useFetchUserDetails() {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: fetchUserDetails,
    retry: false,
  });
}
