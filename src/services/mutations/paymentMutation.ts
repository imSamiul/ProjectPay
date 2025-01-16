import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePayment } from '../../api/paymentApis';
import { EditPaymentModalPropsType } from '../../types/paymentType';
import { paymentApi } from '../../api/paymentApis';

export function useAddPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: paymentApi.addPayment,

    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data) => {
      const projectCode = data.project.projectCode;
      console.log('projectCode', projectCode);

      // await queryClient.invalidateQueries({ queryKey: ['payments'] });
      await queryClient.invalidateQueries({
        queryKey: ['projectDetails', projectCode],
      });
    },
  });
}

// edit payment details
export function useEditPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedPaymentObj: EditPaymentModalPropsType) =>
      paymentApi.updatePayment(updatedPaymentObj),
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data) => {
      const projectCode = data.updatedProject.projectCode;

      await queryClient.invalidateQueries({
        queryKey: ['projectDetails', projectCode],
      });
    },
  });
}

// delete payment
export function useDeletePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paymentId: string) => deletePayment(paymentId),
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data) => {
      const projectCode = data.updatedProject.projectCode;

      await queryClient.invalidateQueries({
        queryKey: ['projects', projectCode],
      });
    },
  });
}
