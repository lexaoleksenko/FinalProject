import React, { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import CartItem from '../CartItem';

// import './shoppingcart.sccs';

const cartData = [
  {
    id: 1,
    name: 'iPhone 11',
    price: 150,
    count: 2,
  },
  {
    id: 2,
    name: 'iPhone 12',
    price: 200,
    count: 1,
  },
  {
    id: 3,
    name: 'iPhone 13',
    price: 250,
    count: 3,
  },
  {
    id: 4,
    name: 'iPhone 14',
    price: 300,
    count: 4,
  },
];

function ShoppingCart() {
  const [items, setItems] = useState(cartData);

  const result = items.reduce(
    (previousValue, currentItem) =>
      previousValue + currentItem.count * currentItem.price,
    0,
  );

  const Footer = (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <Typography sx={{ fontSize: 20, color: 'black' }}>
        Total amount: {result}$
      </Typography>
      <Button variant="contained">Checkout</Button>
    </Box>
  );

  const EmptyTemplate = <div className="empty-text">Cart is empty</div>;

  const handleRemoveItem = id => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleIncreaseCount = id => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      }),
    );
  };

  const handleDecreaseCount = (id, count) => {
    if (count < 2) {
      handleRemoveItem(id);
    } else {
      setItems(
        items.map(item => {
          if (item.id === id) {
            return { ...item, count: item.count - 1 };
          }
          return item;
        }),
      );
    }
  };

  return (
    <>
      {items.length ? (
        <CartItem
          items={items}
          remove={handleRemoveItem}
          increase={handleIncreaseCount}
          decrease={handleDecreaseCount}
        />
      ) : (
        EmptyTemplate
      )}
      {items.length && Footer}
    </>
  );
}

export default ShoppingCart;
