import { React, useEffect, useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import InputCheckoutPage from '../../UI/InputCheckoutPage/InputCheckoutPage';
import ButtonsCheckoutPage from '../../UI/Buttons/ButtonsCheckoutPage/ButtonsCheckoutPage';
import { toggleDrawer } from '../../../redux/slices/shopping-cart';
import {
  checkoutState,
  updateFormStatus,
} from '../../../redux/slices/checkout';

function FormContacts({ handelContinue }) {
  const dispatch = useDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  const { contactsForm } = useSelector(checkoutState);

  const contactsContent = Boolean(
    contactsForm.firstName ||
      contactsForm.lastName ||
      contactsForm.email ||
      contactsForm.phoneNumber,
  );

  const continueStatus = contactsContent && isFormValid;

  const handleIsValid = isValid => {
    const timer = setTimeout(() => {
      setIsFormValid(isValid);
    }, 50);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (isFormValid === false) {
      dispatch(updateFormStatus(false));
    }
  }, [isFormValid]);

  const handelBackToCart = () => {
    dispatch(toggleDrawer(true));
  };

  const formStatusTrue = () => {
    dispatch(updateFormStatus(true));
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: contactsForm.firstName,
          lastName: contactsForm.lastName,
          email: contactsForm.email,
          phoneNumber: contactsForm.phoneNumber,
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
        {({ isValid }) => {
          handleIsValid(isValid);
          return (
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
          );
        }}
      </Formik>
      <Stack style={{ padding: '50px 20px' }} direction="column" spacing={3}>
        <ButtonsCheckoutPage
          label="Saved & Continue"
          variant="contained"
          size="large"
          type="submit"
          onClick={() => {
            formStatusTrue();
            handelContinue();
          }}
          disabled={!continueStatus}
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

FormContacts.propTypes = {
  handelContinue: PropTypes.func.isRequired,
};
export default FormContacts;
