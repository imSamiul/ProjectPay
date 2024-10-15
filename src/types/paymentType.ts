export type PaymentType = {
  _id?: string;
  projectId: string;
  paymentDate: Date;
  paymentAmount: number;
  paymentMethod: string;
  transactionId: string;
};
