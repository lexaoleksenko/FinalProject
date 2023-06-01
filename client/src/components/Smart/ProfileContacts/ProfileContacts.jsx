import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, TextField } from '@mui/material';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../../../helpers/authentication/authentication';
import {
  customerState,
  fetchNewCustomerData,
} from '../../../redux/slices/customer';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';

function ProfileContacts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Authenticated Logic
  const isAuth = isAuthenticated();
  const { customer } = useSelector(customerState);
  const [customerData, setCustomerData] = useState(customer);

  useEffect(() => {
    if (customer) {
      setCustomerData(customer);
    }
  }, [customer]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  // logic disabled Button

  const [isDisabledButton, setIsDisabledButton] = useState(true);

  // logic put Data

  const handleNewData = values => {
    setIsDisabledButton(true);
    return dispatch(fetchNewCustomerData(values));
  };

  return (
    <Formik
      onSubmit={handleNewData}
      initialValues={{
        firstName: customerData && customerData.firstName,
        lastName: customerData && customerData.lastName,
        email: customerData && customerData.email,
        phoneNumber: customerData && customerData.phoneNumber,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
          .required('Name is required*'),
        lastName: Yup.string()
          .matches(/^[A-Za-z ]*$/, 'Please enter valid surname')
          .required('Surname is required*'),
        email: Yup.string()
          .email('Please enter a valid email address')
          .required('Email is required*'),
        phoneNumber: Yup.number().min(
          10,
          'Please enter your phone number correctly',
        ),
      })}
    >
      {({ isValid, values }) => {
        useEffect(() => {
          const newDataBool = Boolean(
            customer.firstName === values.firstName &&
              customer.lastName === values.lastName &&
              customer.phoneNumber === values.phoneNumber &&
              customer.email === values.email,
          );
          if (newDataBool || !isValid) {
            setIsDisabledButton(true);
          }
          if (!newDataBool && isValid) {
            setIsDisabledButton(false);
          }
        }, [values, isValid]);
        return (
          <Form>
            <Grid container spacing={5} direction="column">
              <Grid item xs={6} display="flex">
                <Box width="100%" marginRight="10px" position="relative">
                  <Field type="text" id="firstName" name="firstName">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        error={meta.touched && meta.error}
                        helperText={meta.touched && meta.error}
                        FormHelperTextProps={{
                          style: {
                            position: 'absolute',
                            bottom: '-20px',
                            fontSize: '13px',
                          },
                        }}
                      />
                    )}
                  </Field>
                </Box>
                <Box width="100%" marginLeft="10px" position="relative">
                  <Field type="text" id="lastName" name="lastName">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        error={meta.touched && meta.error}
                        helperText={meta.touched && meta.error}
                        FormHelperTextProps={{
                          style: {
                            position: 'absolute',
                            bottom: '-20px',
                            fontSize: '13px',
                          },
                        }}
                      />
                    )}
                  </Field>
                </Box>
              </Grid>
              <Grid item xs={12} position="relative">
                <Field type="text" id="email" name="email">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        style: {
                          position: 'absolute',
                          bottom: '-20px',
                          fontSize: '13px',
                        },
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} position="relative">
                <Field type="phone" id="phoneNumber" name="phoneNumber">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        style: {
                          position: 'absolute',
                          bottom: '-20px',
                          fontSize: '13px',
                        },
                      }}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
            <Box
              sx={{
                textAlign: 'center',
                marginTop: '30px',
              }}
            >
              <ButtonDark
                label="Save"
                type="submit"
                style={{ width: '250px' }}
                disabled={isDisabledButton}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ProfileContacts;
