import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { registReducer } from './slices/registr';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    regist: registReducer,
  },
});
