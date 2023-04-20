import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';

const cartData = [
  {
    id: 1,
    name: 'iPhone 11',
    price: 150,
    count: 2,
    img: 'https://cdn.tehnoezh.ua/0/0/0/1/1/4/4/0/6/000114406_545_545.jpeg',
  },
  {
    id: 2,
    name: 'iPhone 12',
    price: 200,
    count: 1,
    img: 'https://cdn.tehnoezh.ua/0/0/0/1/1/4/4/0/6/000114406_545_545.jpeg',
  },
  {
    id: 3,
    name: 'iPhone 13',
    price: 250,
    count: 3,
    img: 'https://cdn.tehnoezh.ua/0/0/0/1/1/4/4/0/6/000114406_545_545.jpeg',
  },
  {
    id: 4,
    name: 'iPhone 14',
    price: 300,
    count: 4,
    img: 'https://cdn.tehnoezh.ua/0/0/0/1/1/4/4/0/6/000114406_545_545.jpeg',
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
      <NavLink to="/checkout">
        <Button variant="contained">Checkout</Button>
      </NavLink>
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
        <ShoppingCartItem
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
