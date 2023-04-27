import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import { stateSelectedProducts } from '../../../redux/slices/shopping-cart';
import FooterShoppingCart from '../FooterShoppingCart/FooterShoppingCart';
import style from './ProductOrderInfo.module.scss';

function ProductOrderInfo() {
  const selectedProducts = useSelector(stateSelectedProducts);
  const result = selectedProducts.reduce(
    (previousValue, currentItem) =>
      previousValue + currentItem.quantity * currentItem.currentPrice,
    0,
  );

  return (
    <Grid spacing={2} container>
      <Grid xs={6} className={[style.box, style.boxes].join(' ')}>
        <ShoppingCartItem items={selectedProducts} buttonDisplay />
      </Grid>
      <Grid xs={6} className={style.box}>
        <Typography variant="h6" className={style.title}>
          Order Information
        </Typography>
        <Typography variant="p" className={style.info}>
          Information from the section Contacts and Delivery will be displayed
          here.
        </Typography>
      </Grid>
      <Grid xs={12} className={style.box}>
        <FooterShoppingCart amount={result} />
      </Grid>
    </Grid>
  );
}
export default ProductOrderInfo;
