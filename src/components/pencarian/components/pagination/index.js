import React from 'react';
import queryString from 'query-string';

const paginationPerPage = 12;

export const paginateDataset = ({
  dataset,
  page,
}) => {
  if (dataset === null) return null;
  if (dataset.length < paginationPerPage) return dataset;

  const startPage = (page - 1) * paginationPerPage;
  return dataset.splice(startPage, paginationPerPage);
};

export const Pagination = ({
  datasetLength,
  currentPage,
  filter,
  history
}) => {
  if (datasetLength - 1 < paginationPerPage) return null;

  const startPage = (currentPage - 1) * paginationPerPage;
  const endPage = startPage + paginationPerPage;

  let paginateNext = null;
  let paginatePrev = null;

  if (endPage < datasetLength) {
    const filterNext = {
      ...filter,
      page: parseInt(currentPage) + 1
    };
    paginateNext = (
      <span
        className="pagination__next"
        onClick={() => {
          history.push('/pencarian?' + queryString.stringify(filterNext));
          window.scroll(0,0);
        }}
      >
        Selanjutnya <span className="icon-arrow-right" />
      </span>
    );
  }
  if (currentPage > 1) {
    const filterPrev = {
      ...filter,
      page: parseInt(currentPage) - 1
    };
    paginatePrev = (
      <span
        className="pagination__prev"
        onClick={() => {
          history.push('/pencarian?' + queryString.stringify(filterPrev));
          window.scroll(0,0);
        }}
      >
        <span className="icon-arrow-left" /> Sebelumnya
      </span>
    );
  }

  return (
    <div className="pagination">
      {paginateNext}
      {paginatePrev}
    </div>
  )
};

export default Pagination;
