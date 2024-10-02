type ModalProps = {
  id: string;
  title: string;
  content: string;
  openButtonLabel?: string; // Optional prop with a default value
  closeButtonLabel?: string; // Optional prop with a default value
  confirmButtonLabel?: string; // Optional prop with a default value
};

function Modal({
  id,
  title,
  content,
  openButtonLabel = "Open Modal",
  closeButtonLabel = "Close",
  confirmButtonLabel = "Confirm",
}: ModalProps) {
  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button className="btn" onClick={() => openModal(id)}>
        {openButtonLabel}
      </button>

      {/* Combined Modal with modal-bottom sm:modal-middle */}
      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{content}</p>
          <div className="modal-action">
            <form method="dialog ">
              {/* Close button inside the modal */}
              <div className="flex gap-3">
                <button className="btn">{closeButtonLabel}</button>
                <button className="btn">{confirmButtonLabel}</button>
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
