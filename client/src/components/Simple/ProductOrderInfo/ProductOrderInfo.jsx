import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Stack, Typography } from '@mui/material';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import {
  stateSelectedProducts,
  toggleDrawer,
} from '../../../redux/slices/shopping-cart';
import FooterShoppingCart from '../FooterShoppingCart/FooterShoppingCart';
import style from './ProductOrderInfo.module.scss';
import ButtonsCheckoutPage from '../../UI/Buttons/ButtonsCheckoutPage/ButtonsCheckoutPage';

function ProductOrderInfo() {
  const selectedProducts = useSelector(stateSelectedProducts);
  const result = selectedProducts.reduce(
    (previousValue, currentItem) =>
      previousValue + currentItem.quantity * currentItem.currentPrice,
    0,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const handelBackToCart = () => {
    dispatch(toggleDrawer(true));
  };
  return (
    <Grid spacing={2} container>
      <Grid item xs={6} className={[style.box, style.boxes].join(' ')}>
        <ShoppingCartItem
          items={selectedProducts}
          buttonDisplay
          quantityDisplay
        />
        <FooterShoppingCart amount={result} />
      </Grid>
      <Grid item xs={6} className={style.box}>
        <Typography variant="h6" className={style.title}>
          Order Information
        </Typography>
        <Typography variant="p" className={style.info}>
          Information from the section Contacts and Delivery will be displayed
          here.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack style={{ padding: '50px 20px' }} direction="column" spacing={3}>
          <ButtonsCheckoutPage
            label="Confirm order"
            variant="contained"
            size="large"
          />
          <ButtonsCheckoutPage
            label="Back to Cart"
            variant="outlined"
            size="large"
            onClick={handelBackToCart}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
export default ProductOrderInfo;
