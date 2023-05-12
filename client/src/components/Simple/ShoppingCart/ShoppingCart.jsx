import React, { useEffect, useState } from 'react';
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

import {
  cartBackState,
  fetchDelProductsCart,
  fetchAddProductsCart,
  fetchDelProductQuant,
} from '../../../redux/slices/cartBack';

function ShoppingCart() {
  const isAuth = Boolean(localStorage.getItem('token'));
  const dispatch = useDispatch();

  // *** Not authorized logic ***
  const selectedProducts = useSelector(stateSelectedProducts);
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

  // *** AUTHORIZED logic ***
  const [cartBackTotal, setCartBackTotal] = useState(0);

  const { productsCartBack, statusCartBack } = useSelector(cartBackState);
  const bearer = localStorage.getItem('token');
  const backStatus = statusCartBack && productsCartBack && isAuth;

  useEffect(() => {
    if (productsCartBack) {
      const totalPrice = productsCartBack.reduce((acc, prod) => {
        return acc + prod.product.currentPrice * prod.cartQuantity;
      }, 0);
      setCartBackTotal(totalPrice);
    }
  }, [productsCartBack]);

  const handleRemoveItemBack = prodId => {
    dispatch(fetchDelProductsCart({ token: bearer, productId: prodId }));
  };

  const handleIncreaseCountBack = prodId => {
    dispatch(fetchAddProductsCart({ token: bearer, productId: prodId }));
  };

  const handleDecreaseCountBack = (prodId, count) => {
    if (count < 2) {
      return;
    }
    dispatch(fetchDelProductQuant({ token: bearer, productId: prodId }));
  };

  if (selectedProducts.length && !isAuth) {
    return (
      <>
        <ShoppingCartItem
          items={selectedProducts}
          remove={handleRemoveItem}
          increase={handleIncreaseCount}
          decrease={handleDecreaseCount}
          addItemBack={handleIncreaseCountBack}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <FooterShoppingCart amount={result} />
          <NavLink to="/checkout">
            <ButtonDark label="CHECKOUT" onClick={handleCheckout} />
          </NavLink>
        </Box>
      </>
    );
  }
  if (backStatus) {
    return (
      <>
        {productsCartBack.map(prod => (
          <ShoppingCartItem
            key={prod.product.itemNo}
            items={null}
            itemBack={prod.product}
            cartBackId={prod._id}
            cartBackQuantity={prod.cartQuantity}
            removeBack={handleRemoveItemBack}
            increaseBack={handleIncreaseCountBack}
            decreaseBack={handleDecreaseCountBack}
          />
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <FooterShoppingCart amount={cartBackTotal} />
          <NavLink to="/checkout">
            <ButtonDark label="CHECKOUT" onClick={handleCheckout} />
          </NavLink>
        </Box>
      </>
    );
  }
  if (!selectedProducts.length || !productsCartBack) {
    return <EmptyCart />;
  }
}

export default ShoppingCart;
