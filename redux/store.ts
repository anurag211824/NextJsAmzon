// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice"


export const store = configureStore({
  reducer: {
    cartItems: cartReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});