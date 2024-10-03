type ModalProps = {
  id: string;
  title: string;
  content: string;
  openButtonLabel?: string; // Optional prop with a default value
  closeButtonLabel?: string; // Optional prop with a default value
  confirmButtonLabel?: string; // Optional prop with a default value
  btnConfirmAction: () => void;
};

function Modal({
  id,
  title,
  content,
  openButtonLabel = "Open Modal",
  closeButtonLabel = "Close",
  confirmButtonLabel = "Confirm",
  btnConfirmAction,
}: ModalProps) {
  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal?.showModal();
  };

  const handleSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const modal = document.getElementById(id) as HTMLDialogElement;
    modal?.close();
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button className="btn" onClick={() => openModal(id)}>
        {openButtonLabel}
      </button>

      {/* Combined Modal with modal-bottom sm:modal-middle */}
      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-current">
          <h3 className="font-bold text-lg text-black">{title}</h3>
          <p className="py-4 text-black">{content}</p>
          <div className="modal-action">
            <form method="dialog " onSubmit={handleSubmitHandler}>
              {/* Close button inside the modal */}
              <div className="flex gap-3">
                <button className="btn">{closeButtonLabel}</button>
                <button className="btn" onClick={btnConfirmAction}>
                  {confirmButtonLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Clicking outside the modal area to close */}
        <form method="dialog" className="modal-backdrop">
          <button>{closeButtonLabel}</button>
        </form>
      </dialog>
    </div>
  );
}

export default Modal;
