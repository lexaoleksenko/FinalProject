import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  stateDrawer: false,
};

const shoppingCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProducts(state, action) {
      const newState = {
        ...state,
        products: action.payload,
      };
      return newState;
    },
    toggleDrawer(state, action) {
      const newState = {
        ...state,
        stateDrawer: action.payload,
      };
      return newState;
    },
  },
});

export const { setProducts, toggleDrawer } = shoppingCartSlice.actions;

export const setCartProducts = state => state.cart.products;
export const stateDrawer = state => state.cart.stateDrawer;

export const cartReducer = shoppingCartSlice.reducer;
