import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import { stateCartProd } from '../../../redux/slices/shopping-cart';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import FooterShoppingCart from '../FooterShoppingCart/FooterShoppingCart';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import EmptyCart from '../EmptyCart/EmptyCart';

function ShoppingCart() {
  const products = useSelector(stateCartProd);
  const [items, setItems] = useState(products);
  const dispatch = useDispatch();
  const result = items.reduce(
    (previousValue, currentItem) =>
      previousValue + currentItem.quantity * currentItem.currentPrice,
    0,
  );

  const handleRemoveItem = itemNo => {
    setItems(items.filter(item => item.itemNo !== itemNo));
  };
  const handleIncreaseCount = itemNo => {
    setItems(
      items.map(item => {
        if (item.itemNo === itemNo) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }),
    );
  };

  const handleDecreaseCount = (itemNo, count) => {
    if (count < 2) {
      return;
    }
    setItems(
      items.map(item => {
        if (item.itemNo === itemNo) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }),
    );
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {items.length ? (
        <>
          <ShoppingCartItem
            items={items}
            remove={handleRemoveItem}
            increase={handleIncreaseCount}
            decrease={handleDecreaseCount}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <FooterShoppingCart amount={result} />
            <NavLink to="/checkout">
              <ButtonDark label="CHECKOUT" />
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
