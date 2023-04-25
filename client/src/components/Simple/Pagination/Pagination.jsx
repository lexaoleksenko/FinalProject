import * as React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PaginationRounded(props) {
  const { productsPerPage, totalProducts, paginate, currentPage } = props;
  const pageNumbers = Math.ceil(totalProducts / productsPerPage);

  const handleChange = (event, value) => {
    paginate(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageNumbers}
        page={currentPage}
        onChange={handleChange}
        shape="rounded"
        style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 }}
      />
    </Stack>
  );
}

PaginationRounded.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default PaginationRounded;
