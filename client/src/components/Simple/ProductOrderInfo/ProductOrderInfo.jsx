import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Stack, Typography, Divider } from '@mui/material';
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

  //  Logic OrderInfo
  // Contact Form
  const { contactsForm, contactsFormStatus } = useSelector(checkoutState);
  const [contactsInfo, setContactsInfo] = useState(null);

  useEffect(() => {
    if (contactsFormStatus) {
      setContactsInfo(contactsForm);
    }
  }, [contactsForm, contactsFormStatus]);

  // Delivery and payment

  const { deliveryAddress, shipping, paymentInfo, deliveryPaymentStatus } =
    useSelector(checkoutState);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    if (deliveryPaymentStatus) {
      setDeliveryInfo(deliveryAddress);
    }
    if (shipping === 'CourierDeliveryKyiv') {
      setDeliveryMethod('Courier for Kyiv');
    }
    if (shipping === 'PostOfficeDelivery') {
      setDeliveryMethod('Delivery by mail to the office');
    }
    if (paymentInfo === 'payment-upon-delivery') {
      setPaymentMethod('Cash on delivery');
    }
    if (paymentInfo === 'payment-by-card') {
      setPaymentMethod('Payment by bank card');
    }
  }, [deliveryAddress, shipping, paymentInfo, deliveryPaymentStatus]);

  // Order

  const [order, setOder] = useState({
    products: [],
    deliveryAddress: {
      country: '',
      city: '',
      address: '',
      postal: '',
    },
    shipping: '',
    paymentInfo: '',
    status: 'not shipped',
    email: '',
    mobile: '',
    letterSubject: 'Thank you for order! You are welcome!',
    letterHtml: `<h1>Your order is placed.</h1>`,
  });

  useEffect(() => {
    if (contactsFormStatus && deliveryPaymentStatus && selectedProducts) {
      setOder({
        ...order,
        deliveryAddress: {
          ...order.deliveryAddress,
          country: deliveryAddress.country,
          city: deliveryAddress.city.split(' ').shift(),
          address: deliveryAddress.address,
          postal: deliveryAddress.postal,
        },
        shipping: deliveryMethod,
        paymentInfo: paymentMethod,
        status: 'not shipped',
        email: contactsForm.email,
        mobile: contactsForm.phoneNumber,
        letterSubject: 'Thank you for order! You are welcome!',
        letterHtml: `<h1>Your order is placed.</h1><p>City:${deliveryAddress.city
          .split(' ')
          .shift()}. Address: ${deliveryAddress.address}
          Payment amount: ${result}</p>`,
        products: selectedProducts,
      });
    }
  }, [
    contactsForm,
    deliveryAddress,
    deliveryMethod,
    paymentMethod,
    deliveryPaymentStatus,
    contactsFormStatus,
  ]);

  const handleConfirmOrder = () => {
    console.log('Order>>>>', order);
  };

  const confirmOrderStatus = Boolean(
    deliveryPaymentStatus && contactsFormStatus,
  );

  return (
    <Grid spacing={2} container>
      <Grid item xs={6} className={[style.box, style.boxes].join(' ')}>
        <Typography variant="h6" className={style.title}>
          Cart Products
        </Typography>
        <Divider />
        <ShoppingCartItem
          items={selectedProducts}
          buttonDisplay
          quantityDisplay
        />
        <FooterShoppingCart amount={result} />
      </Grid>
      <Grid item xs={6} className={[style.box, style.boxes]}>
        <Typography variant="h6" className={style.title}>
          Order Information
        </Typography>
        <Divider />
        <Typography variant="p" className={style.info}>
          <div>
            <p>Contacts:</p>
            <p>
              <span>Name: </span>
              <span>
                {contactsInfo ? contactsInfo.firstName : 'Not entered'}
              </span>
            </p>
            <p>
              <span>Surname: </span>
              <span>
                {contactsInfo ? contactsInfo.lastName : 'Not entered'}
              </span>
            </p>
            <p>
              <span>Email: </span>
              <span>{contactsInfo ? contactsInfo.email : 'Not entered'}</span>
            </p>
            <p>
              <span>PhoneNumber: </span>
              <span>
                {contactsInfo ? contactsInfo.phoneNumber : 'Not entered'}
              </span>
            </p>
          </div>
          <Divider />
          <div>
            <p>Deliveri and Payment:</p>
            <p>
              <span>Country: </span>
              <span>{deliveryInfo ? deliveryInfo.country : 'Not entered'}</span>
            </p>
            <p>
              <span>City: </span>
              <span>
                {deliveryInfo
                  ? deliveryInfo.city.split(' ').shift()
                  : 'Not entered'}
              </span>
            </p>
            <p>
              <span>Address: </span>
              <span>{deliveryInfo ? deliveryInfo.address : 'Not entered'}</span>
            </p>
            <p>
              <span>Postal: </span>
              <span>{deliveryInfo ? deliveryInfo.postal : 'Not entered'}</span>
            </p>
            <p>
              <span>Delivery method: </span>
              <span>{deliveryMethod ?? 'Not entered'}</span>
            </p>
            <p>
              <span>Payment method: </span>
              <span>{paymentMethod ?? 'Not entered'}</span>
            </p>
          </div>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack style={{ padding: '50px 20px' }} direction="column" spacing={3}>
          <ButtonsCheckoutPage
            label="Confirm order"
            variant="contained"
            size="large"
            disabled={!confirmOrderStatus}
            onClick={handleConfirmOrder}
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
