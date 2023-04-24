import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllProducts,
  allProdState,
} from '../../redux/slices/getAllProducts';

import style from './ItemsList.module.scss';
import ListCard from '../../components/Smart/ListCard/ListCard';
import ListCardSkeleton from '../../components/Smart/ListCard/ListCardSkeleton';
import SimpleAccordion from '../../components/Simple/ProductAccordion/ProductAccordion';
import PaginationRounded from '../../components/Simple/Pagination/Pagination';

function ItemsListPage() {
  const dispatch = useDispatch();
  const [prodArr, setProdArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const { status, products } = useSelector(allProdState);

  useEffect(() => {
    if (status === 'loaded') {
      setProdArr(products[0]);
    }
  }, [status, products]);

  // Logic for displaying current products
  const indexOfLastProduct = currentPage * 9;
  const indexOfFirstProduct = indexOfLastProduct - 9;
  const currentProducts = prodArr.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  if (status === 'loading') {
    return (
      <>
        <h2 className={style.title}>
          All categories
          <span>{'>'}Apple</span>
          <span>{'>'}128GB</span>
          <span>{'>'}Black</span>
        </h2>
        <Grid display="flex">
          <Grid marginRight={1} marginTop={1}>
            <SimpleAccordion />
          </Grid>
          <Grid container spacing={1} marginTop={0} marginBottom={5}>
            {Array.from({ length: 12 }).map((_, index) => (
              <ListCardSkeleton key={index} />
            ))}
          </Grid>
        </Grid>
      </>
    );
  }

  if (prodArr && status === 'loaded') {
    return (
      <>
        <h2 className={style.title}>
          All categories
          <span>{'>'}Apple</span>
          <span>{'>'}128GB</span>
          <span>{'>'}Black</span>
        </h2>
        <Grid display="flex">
          <Grid marginRight={1} marginTop={1}>
            <SimpleAccordion />
          </Grid>
          <Grid container spacing={1} marginTop={0} marginBottom={5}>
            {currentProducts.map((product, index) => (
              <ListCard
                key={index}
                imageUrl={product.imageUrls[0]}
                name={product.name}
                currentPrice={product.currentPrice}
                itemNo={product.itemNo}
              />
            ))}
            <PaginationRounded
              productsPerPage={9}
              totalProducts={prodArr.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default ItemsListPage;
