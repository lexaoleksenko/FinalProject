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
import { stateSelectedProducts } from '../../redux/slices/shopping-cart';
import { stateSelectedProductsFav } from '../../redux/slices/wishList';

function ItemsListPage() {
  const dispatch = useDispatch();
  const [prodArr, setProdArr] = useState([]);
  const { status, products } = useSelector(allProdState);
  const selectedProducts = useSelector(stateSelectedProducts);
  const selectedProductsFav = useSelector(stateSelectedProductsFav);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(selectedProductsFav));
  }, [selectedProductsFav]);

  useEffect(() => {
    if (status === 'loaded') {
      setProdArr(products.products);
    }
  }, [status]);

  return (
    <div className={style.root}>
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
        {status === 'loading' ? (
          <Grid container spacing={1} marginTop={0} marginBottom={5}>
            {Array.from({ length: 9 }).map((_, index) => (
              <ListCardSkeleton key={index} />
            ))}
          </Grid>
        ) : (
          <Grid container spacing={1} marginTop={0} marginBottom={5}>
            {prodArr.map((product, index) => (
              <ListCard
                product={product}
                key={index}
                imageUrl={product.imageUrls[0]}
                name={product.name}
                currentPrice={product.currentPrice}
                itemNo={product.itemNo}
              />
            ))}
          </Grid>
        )}
      </Grid>
      <PaginationRounded />
    </div>
  );
}
export default ItemsListPage;
