import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer from '../reducers/shopping-cart';

/* eslint-disable import/prefer-default-export */
export const store = configureStore({
  reducer: {
    cart: shoppingCartReducer,
  },
});
