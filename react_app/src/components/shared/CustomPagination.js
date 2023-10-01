import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({ page, total_pages, handlePageChange }) => {
  const maxVisibleItems = 10;

  let startPage = Math.max(1, page - Math.floor(maxVisibleItems / 2));
  let endPage = Math.min(total_pages, startPage + maxVisibleItems - 1);
  

  startPage = Math.max(1, endPage - maxVisibleItems + 1);

  if (isNaN(page) || isNaN(total_pages)) {
    return null;
  }

  return (
    <div className="pagination">
      <Pagination>
        <Pagination.Item onClick={() => handlePageChange(1)}>Top</Pagination.Item>
        <Pagination.Prev 
          onClick={() => handlePageChange(Math.max(1, page - 1))} 
          disabled={page === 1} 
        />
        <Pagination.Next 
          onClick={() => handlePageChange(Math.min(total_pages, page + 1))} 
          disabled={page === total_pages} 
        />
        <Pagination.Item onClick={() => handlePageChange(total_pages)}>End</Pagination.Item>
        <Pagination.Item>{`Total: ${total_pages}`}</Pagination.Item>

        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <Pagination.Item 
              key={pageNumber} 
              active={pageNumber === page} 
              onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </div>
  );
};

export default CustomPagination;
