import React, { useEffect, useState } from "react";
import "./pagination.scss";

const Pagination = (props) => {
  const { page = 1, totalCount = 0, limit = 10, onPageChangeCb } = props;

  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.round(Math.ceil(totalCount / limit)));
  }, []);

  // Function to handle page change
  const onPageChange = (newPageNumber) => {
    setCurrentPage(newPageNumber);
    onPageChangeCb(newPageNumber);
  };

  return (
    <>
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            className="button-dark"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="button-dark"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
