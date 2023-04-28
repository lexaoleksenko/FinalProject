import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import {
  allProdState,
  setSelectPage,
} from '../../../redux/slices/getAllProducts';

function PaginationRounded() {
  const dispatch = useDispatch();
  const [pageTotal, setPageTotal] = useState(null);
  const { products, status } = useSelector(allProdState);

  const handlePageChange = (event, value) => {
    dispatch(setSelectPage(value));
  };

  useEffect(() => {
    if (status === 'loaded') {
      const pageQuantity = Math.ceil(products[0].productsQuantity / 9);
      setPageTotal(pageQuantity);
    }
  }, [status]);

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageTotal}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        size="small"
        showFirstButton="true"
        showLastButton="true"
        style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 }}
      />
    </Stack>
  );
}

export default PaginationRounded;
