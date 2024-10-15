import { useState } from "react";

import CustomDatePicker from "./CustomDatePicker";
import { PaymentType } from "../../types/paymentType";
import { useAddPayment } from "../../services/mutations/paymentMutation";

type PaymentModalPropsType = {
  id: string;
  projectName: string;
  due: number;
  projectId: string;
};

const INITIAL_VALUES: PaymentType = {
  projectId: "",
  paymentDate: new Date(),
  paymentAmount: 0,
  paymentMethod: "",
  transactionId: "",
};

function PaymentModal({
  id,

  projectName,
  due,
  projectId,
}: PaymentModalPropsType) {
  const [paymentModalFormValues, setPaymentModalFormValues] =
    useState<PaymentType>(INITIAL_VALUES);

  const [error, setError] = useState<string | null>(null);

  const addProjectPayment = useAddPayment();

  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal?.showModal();
  };

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setError(null);

    const { name, value } = e.target;
    setPaymentModalFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleDateChange(date: Date | null) {
    if (date) {
      setPaymentModalFormValues((prev) => ({
        ...prev,
        paymentDate: date,
      }));
    }
  }

  const handleSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      paymentModalFormValues.paymentAmount <= 0 ||
      !paymentModalFormValues.paymentMethod ||
      !paymentModalFormValues.transactionId
    ) {
      setError("All fields must be filled correctly.");
      return;
    }
    if (paymentModalFormValues.paymentAmount > due) {
      setError("Payment amount cannot exceed due amount.");
      return;
    }
    setError(null);
    const modal = document.getElementById(id) as HTMLDialogElement;
    modal?.close();
    const paymentObj = { ...paymentModalFormValues, projectId };
    addProjectPayment.mutate(paymentObj);
    setPaymentModalFormValues(INITIAL_VALUES);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        className="btn bg-martinique-500 outline-none border-none hover:bg-martinique-600 text-white  "
        onClick={() => openModal(id)}
      >
        Add Payment
      </button>

      {/* Combined Modal with modal-bottom sm:modal-middle */}
      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box md:w-11/12 md:max-w-3xl md:overflow-visible">
          {/* Adjust the width here */}
          <div className="flex items-center justify-between flex-col md:flex-row">
            <h3 className="font-bold text-base md:text-xl text-black">
              Add Payment for {projectName}
            </h3>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 ">
            <div className="flex flex-col gap-2">
              <label className="text-base">Amount:</label>
              <input
                className="input input-bordered input-md"
                type="number"
                name="paymentAmount"
                value={paymentModalFormValues.paymentAmount}
                onChange={handleInputChange}
                placeholder="Amount (required)"
              />
            </div>

            <label className="form-control w-full gap-2">
              <div className="label p-0">
                <span className="text-base md:st label-text">
                  Pick a payment method
                </span>
              </div>
              <select
                className="select select-bordered"
                name="paymentMethod"
                onChange={handleInputChange}
                value={paymentModalFormValues.paymentMethod}
              >
                <option disabled value="">
                  Pick one
                </option>
                <option value="cash">Cash</option>
                <option value="bkash">Bkash</option>
                <option value="nagad">Nagad</option>
                <option value="rocket">Rocket</option>
                <option value="bank">Bank</option>
              </select>
            </label>

            <div className="flex flex-col gap-2">
              <label className="text-base">Transaction Id:</label>
              <input
                className="input input-bordered"
                type="text"
                name="transactionId"
                onChange={handleInputChange}
                placeholder="TrxId"
                value={paymentModalFormValues.transactionId}
              />
            </div>
            <CustomDatePicker
              label="Payment Date: "
              paymentDate={paymentModalFormValues.paymentDate}
              onSelectDate={handleDateChange}
            />
          </div>
          <div className="modal-action">
            <form method="dialog " onSubmit={handleSubmitHandler}>
              <div className="flex gap-3">
                <button className="btn btn-warning">Close</button>
                <button className="btn  btn-success">Confirm</button>
              </div>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
}

export default PaymentModal;
