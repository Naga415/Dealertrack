// *** copy of https://raw.ghe.coxautoinc.com/VinSolutions/fusion-ui-components/develop/src/components/DataTable/DataTablePagination.js
import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/lib/Pagination';

const DataTablePagination = ({ ...props }) => {
  return (
    <Pagination
      bsSize="medium"
      items={props.maxPages}
      activePage={props.currentPage}
      onSelect={props.setPage}
      maxButtons={5}
      prev
      next
      first
      last
      ellipsis
      boundaryLinks
    />
  );
};

DataTablePagination.propTypes = {
  currentPage: PropTypes.number,
  maxPages: PropTypes.number,
  setPage: PropTypes.func
};

export default DataTablePagination;
