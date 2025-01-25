import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Client } from '../../types/userType';
import ClientDetailsModal from '../modals/ClientDetailsModal';

const columnHelper = createColumnHelper<Client>();

function VerifiedClientTable({
  approvedClients,
}: {
  approvedClients: Client[];
}) {
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'index',
        header: '#',
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor('avatar', {
        header: 'Avatar',
        cell: (info) => {
          return (
            <div className="avatar">
              {info.getValue() ? (
                <img
                  src={info.getValue()}
                  alt="avatar"
                  className="mask mask-squircle h-12 w-12"
                />
              ) : (
                <FaUser className="mask mask-squircle h-12 w-12 bg-base-300" />
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor('userName', {
        header: 'Name',
      }),
      columnHelper.accessor('email', {
        header: 'Email',
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (info) => {
          return (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                const modal = document.getElementById(
                  'clientDetails',
                ) as HTMLDialogElement;
                setSelectedClient(info.row.original);
                modal.showModal();
              }}
            >
              View Details
            </button>
          );
        },
      }),
    ],
    [],
  );
  const data = useMemo(() => approvedClients, []);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-base-200 card  shadow-xl border">
      <div className="card-body">
        <h4 className="text-lg md:text-xl font-semibold ">Verified Clients</h4>
        <div className="divider my-0"></div>
        {/* table section */}
        <div className="overflow-x-auto ">
          <table className="table ">
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
                <tr key={row.id} className="hover ">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border  text-center text-base">
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
      </div>
    </div>
  );
}

export default VerifiedClientTable;
