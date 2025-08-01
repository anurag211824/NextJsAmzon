// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice"
import userReducer from "./slice/userSlice"

export const store = configureStore({
  reducer: {
    cartItems: cartReducer,
    user:userReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});