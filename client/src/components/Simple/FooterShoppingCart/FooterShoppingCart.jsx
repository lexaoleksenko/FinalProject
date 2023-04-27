import { Box, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function FooterShoppingCart({ amount }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <Typography sx={{ fontSize: 20, color: 'black' }}>
        Total amount: {amount}$
      </Typography>
    </Box>
  );
}

FooterShoppingCart.defaultProps = {
  amount: 0,
};

FooterShoppingCart.propTypes = {
  amount: PropTypes.number,
};
