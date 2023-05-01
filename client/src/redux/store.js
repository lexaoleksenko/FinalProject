import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { registReducer } from './slices/registr';
import { allProdReducer } from './slices/getAllProducts';
import { cardProductReducer } from './slices/getCardProduct';
import { cartReducer } from './slices/shopping-cart';
import { favoritesReducer } from './slices/wishList';
import { sliceReducer } from './slices/search';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    regist: registReducer,
    getAllProducts: allProdReducer,
    getCardProduct: cardProductReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    search: sliceReducer,
  },
});
