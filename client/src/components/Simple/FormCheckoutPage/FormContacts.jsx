import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import InputCheckoutPage from '../../UI/InputCheckoutPage/InputCheckoutPage';
import ButtonsCheckoutPage from '../../UI/Buttons/ButtonsCheckoutPage/ButtonsCheckoutPage';
import { toggleDrawer } from '../../../redux/slices/shopping-cart';

function FormContacts() {
  const dispatch = useDispatch();

  const handelBackToCart = () => {
    dispatch(toggleDrawer(true));
  };

  return (
    <>
      <Formik
        onSubmit={values => {
          console.log(values);
        }}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
            .required('Enter your name correctly'),
          lastName: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Please enter valid surname')
            .required('Enter your surname correctly'),
          email: Yup.string()
            .email('Please enter a valid email address')
            .required('Email is required'),
          phoneNumber: Yup.number()
            .min(10, 'Please enter your phone number correctly')
            .required('The phone number is required'),
        })}
      >
        <Form style={{ padding: '30px 10px' }}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography
                style={{ color: '#000000', paddingBottom: '10px' }}
                variant="h5"
              >
                Main Information
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <InputCheckoutPage name="firstName" label="First Name" />
            </Grid>
            <Grid item xs={6}>
              <InputCheckoutPage name="lastName" label="Last Name" />
            </Grid>
            <Grid item xs={12}>
              <InputCheckoutPage name="email" label="Email" />
            </Grid>
            <Grid item xs={12}>
              <InputCheckoutPage name="phoneNumber" label="Phone Number" />
            </Grid>
          </Grid>
        </Form>
      </Formik>
      <Stack style={{ padding: '50px 20px' }} direction="column" spacing={3}>
        <ButtonsCheckoutPage
          label="Saved & Continue"
          variant="contained"
          size="large"
          type="submit"
        />
        <ButtonsCheckoutPage
          label="Back to Cart"
          variant="outlined"
          size="large"
          onClick={handelBackToCart}
        />
      </Stack>
    </>
  );
}
export default FormContacts;
