type ItemsPerPagePropsType = {
  pageSize: number;
  setPageSize: (pageSizeNumber: number) => void;
};
function ItemsPerPage({ pageSize, setPageSize }: ItemsPerPagePropsType) {
  return (
    <div className="flex gap-2 items-center">
      <span className="">Items per page</span>
      <select
        className="border focus:border-indigo-500 p-2"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[5, 10, 15, 20].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ItemsPerPage;
