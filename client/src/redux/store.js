import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { registReducer } from './slices/registr';
import { allProdReducer } from './slices/getAllProducts';
// eslint-disable-next-line import/named
import { cardProductReducer } from './slices/getCardProduct';
import { cartReducer } from './slices/shopping-cart';
// eslint-disable-next-line import/named
import { favoritesReducer } from './slices/wishList';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    regist: registReducer,
    getAllProducts: allProdReducer,
    getCardProduct: cardProductReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});
