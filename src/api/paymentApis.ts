import { EditPaymentModalPropsType, PaymentType } from '../types/paymentType';
import { getErrorMessage } from '../utils/errorHandler';
import { instance } from './instance.api';

export const paymentApi = {
  addPayment: async (paymentObject: PaymentType) => {
    try {
      const response = await instance.post('/payment/add', paymentObject);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  updatePayment: async (paymentObject: EditPaymentModalPropsType) => {
    try {
      const response = await instance.patch(
        `/payment/update/${paymentObject.paymentId}`,
        paymentObject,
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  deletePayment: async (paymentId: string) => {
    try {
      const response = await instance.delete(`/payment/delete/${paymentId}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};
