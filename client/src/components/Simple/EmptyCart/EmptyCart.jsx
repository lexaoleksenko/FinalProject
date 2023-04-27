import React from 'react';
import { Typography } from '@mui/material';

function EmptyCart() {
  return (
    <Typography
      style={{ textAlign: 'center', padding: '20px 0' }}
      className="empty"
    >
      Your Cart is empty
    </Typography>
  );
}

export default EmptyCart;
