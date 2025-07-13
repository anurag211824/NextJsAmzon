/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeCartItem,
} from "@/redux/slice/cartSlice";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
};

const Cart = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const cart: CartItem[] = useSelector((state) => state.cartItems);

  let total = 0;
  for (let i = 0; i < cart?.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }

  return (
    <div className="max-w-[1350px] p-4 mx-auto flex flex-col lg:flex-row gap-10
">
        <div className="flex-1">
        <div className=" grid lg:mt-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cart?.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center gap-4 p-4 border rounded shadow w-auto"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-24 object-cover rounded"
              />
              <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">Price: ${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => dispatch(decreaseCartItemQuantity(item))}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    −
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseCartItemQuantity(item))}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeCartItem(item))}
                className="text-red-500 hover:text-red-700 font-semibold text-left w-full"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
       
      </div>
       <h3 className="order-first lg:order-2 mt-2 text-xl font-bold mb-5 text-end mr-5">
        Total: <span className="text-green-600">${total.toFixed(2)}</span>
      </h3>
    </div>
  );
};

export default Cart;
