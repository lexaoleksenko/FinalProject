import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { registReducer } from './slices/registr';
import { filterProdReducer } from './slices/getFilterProducts';
import { cardProductReducer } from './slices/getCardProduct';
import { cartReducer } from './slices/shopping-cart';
import { favoritesReducer } from './slices/wishList';
import { sliceReducer } from './slices/search';
import { checkoutReducer } from './slices/checkout';
import { cartBackReducer } from './slices/cartBack';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    regist: registReducer,
    getFilterProducts: filterProdReducer,
    getCardProduct: cardProductReducer,
    cart: cartReducer,
    cartBack: cartBackReducer,
    favorites: favoritesReducer,
    search: sliceReducer,
    checkout: checkoutReducer,
  },
});
