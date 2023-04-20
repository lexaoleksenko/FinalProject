import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { registReducer } from './slices/registr';
import { allProdReducer } from './slices/getAllProducts';
import { cardProductReducer } from './slices/getCardProduct';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    regist: registReducer,
    getAllProducts: allProdReducer,
    getCardProduct: cardProductReducer,
  },
});
