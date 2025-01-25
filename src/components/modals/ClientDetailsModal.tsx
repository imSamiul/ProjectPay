import { Client } from '../../types/userType';

function ClientDetailsModal({
  selectedClient,
}: {
  selectedClient: Client | null;
}) {
  return (
    <dialog id="clientDetails" className="modal  modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{selectedClient?.userName}</h3>
        <p className="py-4">{selectedClient?.email}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ClientDetailsModal;
