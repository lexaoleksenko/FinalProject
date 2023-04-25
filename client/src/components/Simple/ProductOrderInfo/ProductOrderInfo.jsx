import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import { stateCartProd } from '../../../redux/slices/shopping-cart';
import FooterShoppingCart from '../FooterShoppingCart/FooterShoppingCart';

function ProductOrderInfo() {
  const products = useSelector(stateCartProd);
  const [items] = useState(products);
  return (
    <>
      <ShoppingCartItem items={items} />
      <FooterShoppingCart />
    </>
  );
}
export default ProductOrderInfo;
