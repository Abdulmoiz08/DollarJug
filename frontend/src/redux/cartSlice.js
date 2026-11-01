
import { createSlice } from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'cartItems';

const loadCartItems = () => {
  try {
    const storedItems = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedItems) return [];

    const parsedItems = JSON.parse(storedItems);

    return Array.isArray(parsedItems) ? parsedItems : [];
  } catch (error) {
    console.error('Failed to load cart items:', error);
    return [];
  }
};

const initialState = {
  cartItems: loadCartItems(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingIndex = state.cartItems.findIndex(
        (x) => x.productId === item.productId
      );

      if (existingIndex !== -1) {
        state.cartItems[existingIndex] = item;
      } else {
        state.cartItems.push(item);
      }

      try {
        localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(state.cartItems)
        );
      } catch (error) {
        console.error('Failed to save cart items:', error);
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );

      try {
        localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(state.cartItems)
        );
      } catch (error) {
        console.error('Failed to update cart storage:', error);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];

      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (error) {
        console.error('Failed to clear cart storage:', error);
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
