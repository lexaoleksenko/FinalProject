import React from 'react';
import { Button, Grid, Stack } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Form, Formik } from 'formik';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
import InputCheckoutPage from '../../UI/InputCheckoutPage/InputCheckoutPage';

function FormContacts() {
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
          phoneNumber: Yup.string()
            .min(19, 'Please enter your phone number correctly')
            .required('The phone number is required'),
        })}
      >
        <Form style={{ padding: '30px 10px' }}>
          <Grid container spacing={5}>
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
      <Stack style={{ padding: '30px 10px' }} direction="column" spacing={3}>
        <Button
          style={{ maxWidth: '450px', margin: '10px auto' }}
          size="large"
          variant="contained"
        >
          Saved & continue
        </Button>
        <Button
          style={{ maxWidth: '450px', margin: '10px auto' }}
          size="large"
          variant="outlined"
        >
          Back to Cart
        </Button>
      </Stack>
    </>
  );
}
export default FormContacts;
