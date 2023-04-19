import React from 'react';
import { TextField } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useField } from 'formik';

// eslint-disable-next-line react/prop-types
function InputCheckoutPage({ name, ...otherProps }) {
  const [field, mata] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
  };

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }
  return <TextField {...configTextField} />;
}

export default InputCheckoutPage;
