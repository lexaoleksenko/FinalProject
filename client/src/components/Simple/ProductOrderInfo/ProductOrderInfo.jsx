import React, { useEffect, useState } from 'react';
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
import { checkoutState } from '../../../redux/slices/checkout';

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

  // Logic OrderInfo
  const { contactsForm, contactsFormStatus } = useSelector(checkoutState);
  const [contactsInfo, setContactsInfo] = useState(null);

  useEffect(() => {
    if (contactsFormStatus) {
      setContactsInfo(contactsForm);
    }
  }, [contactsForm, contactsFormStatus]);

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
          <p>
            <span>Name: </span>
            <span>
              {contactsInfo ? contactsInfo.firstName : 'Enter your Contacts'}
            </span>
          </p>
          <p>
            <span>Surname: </span>
            <span>
              {contactsInfo ? contactsInfo.lastName : 'Enter your Contacts'}
            </span>
          </p>
          <p>
            <span>Email: </span>
            <span>
              {contactsInfo ? contactsInfo.email : 'Enter your Contacts'}
            </span>
          </p>
          <p>
            <span>PhoneNumber: </span>
            <span>
              {contactsInfo ? contactsInfo.phoneNumber : 'Enter your Contacts'}
            </span>
          </p>
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
