type TableSearchBarPropsType = {
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
};

function TableSearchBar({
  globalFilter,
  setGlobalFilter,
}: TableSearchBarPropsType) {
  return (
    <input
      value={globalFilter ?? ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
      placeholder="Search ... "
      className="input input-bordered"
    />
  );
}

export default TableSearchBar;
