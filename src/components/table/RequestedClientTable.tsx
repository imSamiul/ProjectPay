import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { FaUser } from 'react-icons/fa';
import { useCancelProjectInvitation } from '../../services/mutations/projectMutation';
import { Client } from '../../types/userType';

const columnHelper = createColumnHelper<Client>();

function RequestedClientTable({
  requestedClientList,
  projectId,
}: {
  requestedClientList: Client[];
  projectId: string;
}) {
  const { mutate: cancelInvitation, isPending } = useCancelProjectInvitation();

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
        cell: () => <span className="badge badge-warning">Pending</span>,
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (info) => (
          <button
            className="btn btn-sm btn-error"
            onClick={() => handleCancelInvitation(info.row.original)}
            disabled={isPending}
          >
            {isPending ? 'Cancelling...' : 'Cancel Invitation'}
          </button>
        ),
      }),
    ],
    [isPending],
  );

  const data = useMemo(() => requestedClientList, [requestedClientList]);

  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleCancelInvitation(client: Client) {
    if (!projectId || !client.clientId) return;
    cancelInvitation({ projectId, clientId: client.clientId });
  }

  return (
    <div className="bg-base-200 card shadow-xl border mt-5">
      <div className="card-body">
        <h4 className="text-lg md:text-xl font-semibold">
          Pending Client Invitations
        </h4>
        <div className="divider my-0"></div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
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
                  ))}
                </tr>
              ))}
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
      </div>
    </div>
  );
}

export default RequestedClientTable;
