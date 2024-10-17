import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { PaymentType } from "../../types/paymentType";
import { useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";
import Pagination from "../ui/Pagination";

const columnHelper = createColumnHelper<PaymentType>();
const columns = [
  columnHelper.display({
    id: "index",
    header: "#",
    cell: (info) => info.row.index + 1,
  }),
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
    cell: (info) => info.getValue(),
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
    initialState: {
      pagination: {
        pageSize: 2,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  console.log(table.getPageCount());

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
                    {header.column.getCanSort() && <LuArrowDownUp />}
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

      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2 items-center">
          <span className="">Items per page</span>
          <select
            className="border focus:border-indigo-500 p-2"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[2, 4, 6, 8].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="join grid grid-cols-2">
            <Pagination
              totalPages={table.getPageCount()}
              goToFirstPage={() => table.firstPage()}
              goToLastPage={() => table.lastPage()}
              goToNextPage={() => table.nextPage()}
              goToPreviousPage={() => table.previousPage()}
              goToPage={(page) => table.setPageIndex(page)}
              getCanPreviousPageDisabled={!table.getCanPreviousPage()}
              getCanNextPageDisabled={!table.getCanNextPage()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentListTable;
