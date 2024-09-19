import { useQuery } from "@tanstack/react-query";
import { getClientList } from "./apis";

export function useClientList() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getClientList,
  });
}
