interface PaginationProps {
  totalPages: number;
  goToFirstPage?: () => void;
  goToLastPage?: () => void;
  goToNextPage?: () => void;
  goToPreviousPage?: () => void;
  goToPage?: (page: number) => void;
  getCanPreviousPageDisabled?: boolean;
  getCanNextPageDisabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  goToFirstPage,
  goToLastPage,
  goToNextPage,
  goToPreviousPage,
  goToPage,
  getCanPreviousPageDisabled,
  getCanNextPageDisabled,
}) => {
  return (
    <div className="join">
      {/* First page button */}
      <button
        className="join-item btn btn-outline"
        onClick={goToFirstPage}
        disabled={getCanPreviousPageDisabled}
      >
        First Page
      </button>

      {/* Previous page button */}
      <button
        className="join-item btn btn-outline"
        onClick={goToPreviousPage}
        disabled={getCanPreviousPageDisabled}
      >
        Previous Page
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button className="btn" onClick={() => goToPage && goToPage(i)}>
          {i + 1}
        </button>
      ))}
      {/* Next button */}
      <button
        className="join-item btn btn-outline"
        onClick={goToNextPage}
        disabled={getCanNextPageDisabled}
      >
        Next Page
      </button>

      {/* Last page button */}
      <button
        className="join-item btn btn-outline"
        onClick={goToLastPage}
        disabled={getCanNextPageDisabled}
      >
        Last Page
      </button>
    </div>
  );
};

export default Pagination;
