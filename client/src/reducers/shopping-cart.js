import { createSlice } from '@reduxjs/toolkit';

const initialState = { products: [] };

const shoppingCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload; // eslint-disable-line no-param-reassign
    },
  },
});

export const { setProducts } = shoppingCartSlice.actions;

// Selectors
export const setCartProducts = state => state.cart.products;

export default shoppingCartSlice.reducer;
