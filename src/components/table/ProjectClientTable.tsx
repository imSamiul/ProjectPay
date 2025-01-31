import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useCancelProjectInvitation } from '../../services/mutations/projectMutation';
import { Client } from '../../types/userType';
import AddClientModal from '../modals/AddClientModal';
import ClientDetailsModal from '../modals/ClientDetailsModal';

const columnHelper = createColumnHelper<Client>();

function VerifiedClientTable({
  approvedClients,
  requestedClientList,
  projectId,
}: {
  approvedClients: Client[];
  requestedClientList: Client[];
  projectId: string;
}) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const { mutate: cancelInvitation, isPending: isCancelling } =
    useCancelProjectInvitation();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'index',
        header: '#',
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor('avatar', {
        header: 'Avatar',
        cell: (info) => (
          <div className="avatar">
            {info.getValue() ? (
              <img
                src={info.getValue()}
                alt="avatar"
                className="mask mask-squircle h-12 w-12"
                referrerPolicy="no-referrer"
              />
            ) : (
              <FaUser className="mask mask-squircle h-12 w-12 bg-base-300" />
            )}
          </div>
        ),
      }),
      columnHelper.accessor('userName', {
        header: 'Name',
      }),
      columnHelper.accessor('email', {
        header: 'Email',
      }),
      columnHelper.display({
        id: 'status',
        header: 'Status',
        cell: (info) => {
          const isPending = requestedClientList.some(
            (client) => client._id === info.row.original._id,
          );
          return (
            <span
              className={`badge ${
                isPending ? 'badge-warning' : 'badge-success'
              }`}
            >
              {isPending ? 'Pending' : 'Approved'}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: 'details',
        header: 'Details',
        cell: (info) => {
          const client = info.row.original;
          return (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                setSelectedClient(client);
                const modal = document.getElementById(
                  'clientDetails',
                ) as HTMLDialogElement;
                modal.showModal();
              }}
            >
              View Details
            </button>
          );
        },
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (info) => {
          const client = info.row.original;
          const isPending = requestedClientList.some(
            (c) => c._id === client._id,
          );

          if (isPending) {
            return (
              <button
                className="btn btn-sm btn-error"
                onClick={() => handleCancelInvitation(client)}
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Invitation'}
              </button>
            );
          }

          return (
            <button
              className="btn btn-sm btn-error"
              onClick={() => handleRemoveClient(client)}
              // disabled={isRemoving}
            >
              {/* {isRemoving ? 'Removing...' : 'Remove Client'} */}
              Remove
            </button>
          );
        },
      }),
    ],
    [requestedClientList, isCancelling],
  );

  // Combine both lists for the table
  const allClients = useMemo(
    () => [...approvedClients, ...requestedClientList],
    [approvedClients, requestedClientList],
  );

  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data: allClients,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleCancelInvitation(client: Client) {
    if (!projectId || !client.clientId) return;
    cancelInvitation({ projectId, clientId: client.clientId });
  }

  function handleRemoveClient(client: Client) {
    if (!projectId || !client.clientId) return;
    // removeClient({ projectId, clientId: client.clientId });
  }

  return (
    <div className="bg-base-200 card shadow-xl border">
      <div className="card-body">
        <div className="flex justify-between">
          <h4 className="text-lg md:text-xl font-semibold">Project Clients</h4>
          <button
            className="btn btn-primary"
            onClick={() => {
              const modal = document.getElementById(
                'addClient',
              ) as HTMLDialogElement;
              modal.showModal();
            }}
          >
            Add New Client
          </button>
        </div>
        <div className="divider my-0"></div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              {getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className="border text-center text-base"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody>
              {getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border text-center text-base">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ClientDetailsModal selectedClient={selectedClient} />
        <AddClientModal
          pendingClientList={requestedClientList}
          approvedClientList={approvedClients}
          projectId={projectId}
        />
      </div>
    </div>
  );
}

export default VerifiedClientTable;
