import { React, useState } from 'react';
import { Grid, TextField } from '@mui/material';
// import PropTypes from 'prop-types';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateFormStatus } from '../../../redux/slices/checkout';

function ProfileContacts() {
  const dispatch = useDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  console.log(isFormValid);

  const handleIsValid = isValid => {
    const timer = setTimeout(() => {
      setIsFormValid(isValid);
      dispatch(updateFormStatus(isValid));
    }, 50);
    return () => clearTimeout(timer);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
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
        phoneNumber: Yup.number()
          .min(10, 'Please enter your phone number correctly')
          .required('The phone number is required*'),
      })}
    >
      {({ isValid }) => {
        handleIsValid(isValid);
        return (
          <Form>
            <Grid container spacing={5} direction="column">
              <Grid item xs={6}>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <ErrorMessage name="firstName" component="div" />
              </Grid>
              <Grid item xs={6}>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <ErrorMessage name="lastName" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <ErrorMessage name="email" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  type="phone"
                  id="phoneNumber"
                  name="phoneNumber"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <ErrorMessage name="phoneNumber" component="div" />
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

// ProfileContacts.propTypes = {
//   handelContinue: PropTypes.func.isRequired,
// };
export default ProfileContacts;
