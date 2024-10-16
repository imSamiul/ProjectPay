import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { PaymentType } from "../../types/paymentType";
import { useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";

const columnHelper = createColumnHelper<PaymentType>();
const columns = [
  columnHelper.accessor("paymentDate", {
    header: "Payment Date",
    cell: (info) => new Date(info.getValue()).toLocaleDateString("en-GB"),
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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });
  //   console.log(table.getRowModel());

  return (
    <div>
      <div className="p-4">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search ... "
          className="input input-bordered"
        />
      </div>

      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.index}>
                  <div
                    className={`flex items-center gap-2 ${
                      header.column.getCanSort()
                        ? `cursor-pointer select-none flex items-center`
                        : ""
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    <LuArrowDownUp />
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
