import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPayment } from "../paymentApis";

export function useAddPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPayment,

    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data) => {
      const projectCode = data.project.projectCode;

      await queryClient.invalidateQueries({ queryKey: ["payments"] });
      await queryClient.invalidateQueries({
        queryKey: ["projects", projectCode],
      });
    },
  });
}
