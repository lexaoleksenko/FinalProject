import { React, useState, useEffect } from 'react';
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

function ItemsListPage() {
  const dispatch = useDispatch();
  const [prodArr, setProdArr] = useState();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const { status, products } = useSelector(allProdState);

  useEffect(() => {
    if (status === 'loaded') {
      setProdArr(products[0]);
    }
  }, [status, products]);

  if (status === 'loading') {
    return (
      <Grid container spacing={4} marginTop={0} marginBottom={2}>
        {Array.from({ length: 12 }).map((_, index) => (
          <ListCardSkeleton key={index} />
        ))}
      </Grid>
    );
  }

  if (prodArr && status === 'loaded') {
    return (
      <>
        <div className={style.accordion}>
          <SimpleAccordion />
        </div>
        <h2 className={style.title}>
          All categories
          <span>{'>'}Apple</span>
          <span>{'>'}128GB</span>
          <span>{'>'}Black</span>
        </h2>
        <Grid container spacing={4} marginTop={0} marginBottom={5}>
          {prodArr.map((product, index) => (
            <ListCard
              key={index}
              imageUrl={product.imageUrls[0]}
              name={product.name}
              currentPrice={product.currentPrice}
              itemNo={product.itemNo}
            />
          ))}
        </Grid>
      </>
    );
  }
}

export default ItemsListPage;
