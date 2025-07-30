/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

function findItemIndex(state, action) {
  return state.findIndex(
    (cartItem) => cartItem.id === action.payload.id
  );
}

const saveToLocalStorage = (cart)=>{
localStorage.setItem("cart",JSON.stringify(cart));
return;
}

const loadFromLocalStorage = () => {
  if (typeof window === 'undefined') return []; 
  try {
    const cartData = localStorage.getItem("cart");
    if (!cartData) return [];
    return JSON.parse(cartData);
  } catch (e) {
    console.log(e);
    return [];
  }
};
const slice = createSlice({
  name: "cart",
  initialState: loadFromLocalStorage() || [],
  reducers: {
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      saveToLocalStorage(state)
    },
    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state.splice(existingItemIndex, 1);
      }
      saveToLocalStorage(state)
    },
    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      }
      saveToLocalStorage(state)
    },
    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity -= 1;
        if (state[existingItemIndex].quantity === 0) {
          state.splice(existingItemIndex, 1);
        }
      }
      saveToLocalStorage(state)
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  calculateTotalPrice,
} = slice.actions;
export default slice.reducer;