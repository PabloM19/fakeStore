import React from 'react';
import './Pagination.css'; // Importa los estilos

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <div className="pagination">
        <a
          className={`pagination-newer ${currentPage === 1 ? 'disabled' : ''}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) paginate(currentPage - 1);
          }}
        >
          PREV
        </a>
        <span className="pagination-inner">
          {pageNumbers.map(number => (
            <a
              key={number}
              href="#"
              className={`page-link ${currentPage === number ? 'pagination-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                paginate(number);
              }}
            >
              {number}
            </a>
          ))}
        </span>
        <a
          className={`pagination-older ${currentPage === totalPages ? 'disabled' : ''}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) paginate(currentPage + 1);
          }}
        >
          NEXT
        </a>
      </div>
    </div>
  );
};

export default Pagination;
