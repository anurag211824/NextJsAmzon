/* eslint-disable @typescript-eslint/ban-ts-comment */
/*@ts-nocheck*/
/* eslint-disable @next/next/no-img-element */
"use client";

import { AppContext } from "@/context/Appcontext";
import { useContext, useEffect, useState } from "react";

const Cart = () => {
  //@ts-ignore
  const {user, cartItem,fetchCartItems,deleteCartItem,updatecartItemQunatity} = useContext(AppContext);
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
   
   useEffect(() => {
    setLoading(true)
    const updateCart = async()=>{
      const res = await fetchCartItems()
      if(res.success){
        setLoading(false)
      }
      else{
        setError("No any cartItem or error fetching")
      }
    }
    updateCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
   console.log(cartItem);
   if (!cartItem || cartItem.length === 0) {
    return (
     <div>No any cart items</div>
    );
  }
   if(loading){
    return <p>Loading cartItems....</p>
   }
   if(error){
    return <p>{error}</p>
   }
  // Calculate total price
  const calculateTotal = () => {
    if (!cartItem || cartItem.length === 0) return "0.00";
    //@ts-ignore
    return cartItem.reduce((total, item) => {
      if (!item?.product?.price) return total;
      const discountedPrice = item.product.price - (item.product.price * (item.product.discountPercentage || 0)) / 100;
      return total + (discountedPrice * (item.quantity || 0));
    }, 0).toFixed(2);
  };


  const getTotalItems = () => {
    if (!cartItem || cartItem.length === 0) return 0;
    //@ts-ignore
    return cartItem.reduce((total, item) => total + (item.quantity || 0), 0);
  };
  //@ts-ignore
  const getDiscountedPrice = (price, discountPercentage) => {
    if (!price) return "0.00";
    return (price - (price * (discountPercentage || 0)) / 100).toFixed(2);
  };

 
  return (
      <div className="max-w-[1450px] p-4 mx-auto flex flex-col lg:flex-row lg:gap-6">

      <div className="flex-1 mb-6 lg:mb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
         {
          //@ts-ignore
          cartItem.map((item,index)=>{
            // Add safety checks here
            if (!item?.product) {
              console.error("Invalid cart item:", item);
              return null;
            }

            const discountedPrice = getDiscountedPrice(item.product.price, item.product.discountPercentage);
            const originalPrice = (item.product.price || 0).toFixed(2);
            
            return (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden" key={index}>
                <div className="p-4">
        
                  <div className="relative mb-4">
                    <img 
                      src={item.product.thumbnail || '/placeholder-image.jpg'} 
                      alt={item.product.title || 'Product'} 
                      className="w-full h-48 object-cover rounded-lg border border-gray-100" 
                    />
                    {(item.product.discountPercentage || 0) > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {item.product.discountPercentage}% OFF
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 cursor-pointer">
                      {item.product.title || 'Unknown Product'}
                    </h3>
                    
               
                    <div className="flex items-center">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize">
                        {item.product.category || 'Unknown'}
                      </span>
                    </div>
                    
           
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">
                          ${discountedPrice}
                        </span>
                        {(item.product.discountPercentage || 0) > 0 && (
                          <span className="text-xs text-gray-500 line-through">
                            ${originalPrice}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">per item</p>
                    </div>
                    
                
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-gray-700">Qty:</span>
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                          <button onClick={()=>updatecartItemQunatity(user.id,item.id,item.quantity-1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-xs">-</button>
                          <span className="px-2 py-1 text-xs font-medium bg-gray-50 border-x border-gray-300 min-w-[25px] text-center">
                            {item.quantity || 0}
                          </span>
                          <button onClick={()=>updatecartItemQunatity(user.id,item.id,item.quantity+1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-xs">+</button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="text-sm font-bold text-gray-800">
                          ${(Number(discountedPrice) * (item.quantity || 0)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
            
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        In Stock
                      </span>
                      <button onClick={()=>deleteCartItem(user.id,item.id)} className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded border border-red-200 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }).filter(Boolean) // Remove null items
         }
        </div>
      </div>


      <div className="w-full lg:w-80">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sticky top-4">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Items ({getTotalItems()})</span>
              <span className="font-medium">${calculateTotal()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping & handling</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">$0.00</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Order Total</span>
              <span className="text-red-600">${calculateTotal()}</span>
            </div>
          </div>
          
         
        </div>
      </div>
    </div>
 
  );
};

export default Cart;