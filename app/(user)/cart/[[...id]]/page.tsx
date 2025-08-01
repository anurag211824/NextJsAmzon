/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

const Cart = () => {
  return (
    <div
      className="max-w-[1450px] p-4 mx-auto flex flex-col lg:flex-row gap-10">
      <div className="flex-1">
        <div className="max-w-[1000px] grid lg:mt-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      </div>
      <h3 className="order-first lg:order-2 mt-2 text-xl font-bold mb-5 text-end mr-5"></h3>
    </div>
  );
};

export default Cart;
