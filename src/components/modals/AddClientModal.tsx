import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSearchClient } from '../../services/queries/clientQueries';
import { Client } from '../../types/userType';

function AddClientModal({
  pendingClientList,
  approvedClientList,
}: {
  pendingClientList: Client[];
  approvedClientList: Client[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 1000);
  const { data, isLoading } = useSearchClient(debouncedSearchTerm);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }
  // check whether the client is already in the pending or approved list
  function isClientAlreadyAdded(client: Client) {
    return (
      pendingClientList?.some((c) => c._id === client._id) ||
      approvedClientList?.some((c) => c._id === client._id)
    );
  }

  return (
    <dialog id="addClient" className="modal  modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Search Client</h3>
        <input
          type="text"
          placeholder="Enter client email"
          className="input input-bordered my-4 w-full"
          value={searchQuery}
          onChange={handleInputChange}
        />
        {/* if data is loading, show loading message */}
        {isLoading && <p>Loading...</p>}
        {data && (
          <div>
            {data.map((client: Client) => (
              <div
                key={client._id}
                className="flex justify-between items-center bg-base-300 p-2 rounded-md"
              >
                <div className="flex items-center gap-2">
                  {client.avatar ? (
                    <img
                      src={client.avatar}
                      alt="avatar"
                      className="mask mask-squircle h-12 w-12"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <FaUser className="mask mask-squircle h-12 w-12 bg-base-300" />
                  )}
                  <div>
                    <p>{client.userName}</p>
                    <p>{client.email}</p>
                  </div>
                </div>
                <button
                  className="btn btn-neutral"
                  disabled={isClientAlreadyAdded(client)}
                >
                  {isClientAlreadyAdded(client) ? 'Added' : 'Add'}
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-warning">Search</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AddClientModal;
