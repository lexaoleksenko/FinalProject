import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useSelector } from 'react-redux';
import { filterProdState } from '../../redux/slices/getFilterProducts';

// import { searchState } from '../../redux/slices/search';

import style from './ItemsList.module.scss';
import ListCard from '../../components/Smart/ListCard/ListCard';
import ListCardSkeleton from '../../components/Smart/ListCard/ListCardSkeleton';
import SimpleAccordion from '../../components/Simple/ProductAccordion/ProductAccordion';
import PaginationRounded from '../../components/Simple/Pagination/Pagination';
import { stateSelectedProducts } from '../../redux/slices/shopping-cart';
import { stateSelectedProductsFav } from '../../redux/slices/wishList';

function ItemsListPage() {
  // ALL FILTER LOGIC IS IN THE ACCORDION COMPONENT

  const [prodArr, setProdArr] = useState([]);
<<<<<<< HEAD
  const { status, products } = useSelector(allProdState);
=======
  const { status, products } = useSelector(filterProdState);
  const prodQuantity = prodArr <= 0;
  console.log('itemList_prod>>>', prodQuantity);
  // const { searchStatus, searchProducts } = useSelector(searchState);
>>>>>>> b73d6affd43ff61f2ef363109db8313586b42820
  const selectedProducts = useSelector(stateSelectedProducts);
  const selectedProductsFav = useSelector(stateSelectedProductsFav);

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

<<<<<<< HEAD
=======
  // useEffect(() => {
  //   if (searchStatus === 'loaded') {
  //     setProdArr(searchProducts);
  //   }
  // }, [searchStatus]);

>>>>>>> b73d6affd43ff61f2ef363109db8313586b42820
  return (
    <Container maxWidth="lg">
      {' '}
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
            <>
              {prodQuantity ? (
                <Grid container spacing={1} margin="auto" height="100%">
                  <div className={style.wrapper}>
                    <p>Ooops...</p>
                    <p>
                      There were no products with suitable filter settings, try
                      changing your search parameters.
                    </p>
                    <SentimentVeryDissatisfiedIcon fontSize="large" />
                  </div>
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
              <div>{}</div>
            </>
          )}
        </Grid>
        <div>
          <PaginationRounded />
        </div>
      </div>
    </Container>
  );
}

export default ItemsListPage;
