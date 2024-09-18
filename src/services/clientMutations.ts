import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientType } from "../types/clientType";
import { createClient } from "./apis";

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (clientObj: ClientType) => createClient(clientObj),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data, error) => {
      console.log(data, error);
      await queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
