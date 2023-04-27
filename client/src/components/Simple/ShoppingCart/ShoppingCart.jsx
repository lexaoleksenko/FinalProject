import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import {
  decreaseCount,
  increaseCount,
  setSelectedProducts,
  stateSelectedProducts,
  toggleDrawer,
} from '../../../redux/slices/shopping-cart';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import FooterShoppingCart from '../FooterShoppingCart/FooterShoppingCart';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';
import EmptyCart from '../EmptyCart/EmptyCart';

function ShoppingCart() {
  const selectedProducts = useSelector(stateSelectedProducts);
  const dispatch = useDispatch();
  const handleCheckout = () => {
    dispatch(toggleDrawer(false));
  };
  const result = selectedProducts.reduce(
    (previousValue, currentItem) =>
      previousValue + currentItem.quantity * currentItem.currentPrice,
    0,
  );
  const handleRemoveItem = itemNo => {
    const data = selectedProducts.filter(item => item.itemNo !== itemNo);
    dispatch(setSelectedProducts(data));
  };
  const handleIncreaseCount = itemNo => {
    dispatch(increaseCount(itemNo));
  };

  const handleDecreaseCount = (itemNo, count) => {
    if (count < 2) {
      return;
    }
    dispatch(decreaseCount(itemNo));
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {selectedProducts.length ? (
        <>
          <ShoppingCartItem
            items={selectedProducts}
            remove={handleRemoveItem}
            increase={handleIncreaseCount}
            decrease={handleDecreaseCount}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <FooterShoppingCart amount={result} />
            <NavLink to="/checkout">
              <ButtonDark label="CHECKOUT" onClick={handleCheckout} />
            </NavLink>
          </Box>
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}

export default ShoppingCart;
