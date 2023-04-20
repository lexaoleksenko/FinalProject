import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';

// import style from './NavIcon.module.scss';
import ShoppingCart from '../../Simple/ShoppingCart/ShoppingCart';

function CartList({ onClickClose }) {
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="text"
          sx={{
            backgroundColor: '#A9A9A9',
            width: 60,
          }}
          onClick={onClickClose}
        >
          X
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: 32, color: 'black' }}>
          Shopping Cart
        </Typography>
      </Box>
      <Box sx={{ width: 450 }} role="presentation" onKeyDown={onClickClose}>
        <ShoppingCart />
      </Box>
    </Box>
  );
}

CartList.propTypes = {
  onClickClose: PropTypes.func.isRequired,
};

export default CartList;
