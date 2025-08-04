/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import { DeleteCartItem, GetCartItems, updateCartItemQuantity } from "@/actions/cart";
import { getUser } from "@/actions/user";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    role: "",
    id: "",
  });
  useEffect(() => {
    // const fetchUserInfo = async () => {
    //   try {
    //     const response = await fetch("/api/session");
    //     const data = await response.json();
    //     console.log(data)
    //     if (data.success && data.user) {
    //       setUser({
    //         name: data.user.name,
    //         role: data.user.role,
    //         id: data.user.id,
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching user info:", error);
    //   }
    // };

    //fetchUserInfo();

    const fetchUserInfo = async () => {
      try {
        const response = await getUser();
        console.log(response);
        if (response.success && response.user) {
          setUser({
            name: response.user.name,
            role: response.user.role,
            id: response.user.id,
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const [cartItem, setcartItems] = useState([]);
  // fetch cartitesm when user log in on intial render only
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user.id || user.id.trim() === "") {
        return;
      }

      try {
        const res = await GetCartItems(user.id);
        if (res.success) {
          setcartItems(res.cartItems);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, [user.id]);

  // fetch every time when a user go to cart page
  const fetchCartItems = async () => {
    try {
      const res = await GetCartItems(user.id);
      if (res.success) {
        setcartItems(res.cartItems);
        return {success:true}
      }
    } catch (error) {
      console.log(error);
      return {success:false}
    }
  };
  const deleteCartItem = async (userId, cartItemId) => {
    try {
      const res = await DeleteCartItem(userId, cartItemId);
      if (res.success) {
        console.log(res.message);
        fetchCartItems();
      }
    } catch (error) {
      console.log(error);
      console.log("error deleting cartitem");
    }
  };
  const updatecartItemQunatity =  async (userId, cartItemId, quantity)=>{
    try{
   const res = await  updateCartItemQuantity(userId, cartItemId, quantity)
    if(res.success){
      console.log(res.message);
      fetchCartItems()
      
    }
    }
    catch(error){
      console.log(error);
      
    }
  }   
const [cartQuantity,setCartquantity] = useState(0)

  useEffect(()=>{
   setCartquantity(cartItem.reduce((acc,item)=> acc += item.quantity,0))
  },[cartItem])

  
  return (
    <AppContext.Provider
      value={{ user, setUser, cartItem, fetchCartItems, deleteCartItem ,updatecartItemQunatity,cartQuantity}}
    >
      {children}
    </AppContext.Provider>
  );
};
