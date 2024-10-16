import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PaymentType } from "../../types/paymentType";
import { useState } from "react";

const columnHelper = createColumnHelper<PaymentType>();
const columns = [
  columnHelper.accessor("paymentDate", {
    header: "Payment Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("paymentAmount", {
    header: "Payment Amount",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("paymentMethod", {
    header: "Payment Method",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("transactionId", {
    id: "transactionId",
    header: "Transaction ID",
    cell: (info) => (
      <span className="font-medium text-martinique-300">
        {info.getValue().toUpperCase()}
      </span>
    ),
  }),
];

function PaymentListTable({ data }: { data: PaymentType[] }) {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
  });
  console.log(table.getRowModel());

  return (
    <div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.index}>
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentListTable;
