import { useState } from "react";
import Button from "./Button";
import CustomDatePicker from "./CustomDatePicker";
import { PaymentType } from "../../types/paymentType";

type PaymentModalPropsType = {
  id: string;
  title: string;
  content: string;
  openButtonLabel?: string; // Optional prop with a default value
  closeButtonLabel?: string; // Optional prop with a default value
  confirmButtonLabel?: string; // Optional prop with a default value
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
  title,
  // content,
  openButtonLabel = "Open Modal",
  closeButtonLabel = "Close",
  confirmButtonLabel = "Confirm",
}: PaymentModalPropsType) {
  const [paymentModalFormValues, setPaymentModalFormValues] =
    useState<PaymentType>(INITIAL_VALUES);

  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal?.showModal();
  };

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
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
    const modal = document.getElementById(id) as HTMLDialogElement;
    modal?.close();
  };

  function btnConfirmAction() {
    console.log("called");

    console.log("Payment Modal Form Values: ", paymentModalFormValues);
  }

  return (
    <div>
      {/* Button to open the modal */}
      <button
        className="btn bg-martinique-500 outline-none border-none hover:bg-martinique-600 text-white  "
        onClick={() => openModal(id)}
      >
        {openButtonLabel}
      </button>

      {/* Combined Modal with modal-bottom sm:modal-middle */}
      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box md:w-11/12 md:max-w-3xl md:overflow-visible">
          {/* Adjust the width here */}
          <h3 className="font-bold text-base md:text-xl text-black">{title}</h3>
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
              >
                <option disabled selected>
                  Pick one
                </option>
                <option>Cash</option>
                <option>Bkash</option>
                <option>Nagad</option>
                <option>Rocket</option>
                <option>Bank</option>
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
                <button className="btn">{closeButtonLabel}</button>
                <button className="btn" onClick={btnConfirmAction}>
                  {confirmButtonLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>{closeButtonLabel}</button>
        </form>
      </dialog>
    </div>
  );
}

export default PaymentModal;
