/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use server";
import db from "@/service/prisma";

//@ts-ignore
export async function AddTocart(userId, productId) {
  try {
    // check if user exist or not 
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    // if not return false
    if (!user) {
      return {
        success: false,
        message: "user not found",
      };
    }
    // check if the product user want to add exits in db or not
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });
    // if not return false with a message
    if (!product) {
      return {
        success: false,
        message: "product not found",
      };
    }

    // Find or create user's cart
    let cart = await db.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        items: true,
      },
    });
    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: userId,
        },
        include: {
          items: true,
        },
      });
    }
    const existingCartItem = await db.cartItem.findFirst({
      where: {
        cartId: cart?.id,
        productId: productId,
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await db.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + 1,
        },
      });

      return {
        success: true,
        message: "Cart item quantity updated",
        cartItem: updatedCartItem,
      };
    } else {
      const newCartItem = await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: 1,
        },
      });

      return {
        success: true,
        message: "Item added to cart successfully",
        cartItem: newCartItem,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to add item to cart",
    };
  }
}
export async function GetCartItems(userId) {

    try {
        const cart = await db.cart.findUnique({
        where: {
            userId: userId,
        },
        include: {
            items: {
            include: {
                product: true,
            },
            },
        },
        });
    
        if (!cart) {
        return {
            success: false,
            message: "Cart not found",
        };
        }
    
        return {
        success: true,
        message: "Cart items retrieved successfully",
        cartItems: cart.items,
        };
    } catch (error) {
        console.log(error);
        return {
        success: false,
        message: "Failed to retrieve cart items",
        };
    }

}

export async function DeleteCartItem(userId, cartItemId) {
  try {
    const cartItem = await db.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
    });

    if (!cartItem) {
      return {
        success: false,
        message: "Cart item not found",
      };
    }

    // Check if the user owns the cart item
    const cart = await db.cart.findUnique({
      where: {
        id: cartItem.cartId,
      },
    });

    if (cart.userId !== userId) {
      return {
        success: false,
        message: "You do not have permission to delete this item",
      };
    }

    await db.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return {
      success: true,
      message: "Cart item deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return {
      success: false,
      message: "Failed to delete cart item",
    };
  }
  

}

export async function updateCartItemQuantity(userId, cartItemId, quantity) {
  if(quantity === 0){
    return {
      sucess:false,
    }
  }
  try {
    const cartItem = await db.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
    });

    if (!cartItem) {
      return {
        success: false,
        message: "Cart item not found",
      };
    }
    const cart = await db.cart.findUnique({
      where: {
        id: cartItem.cartId,
      },
    });

    if (cart.userId !== userId) {
      return {
        success: false,
        message: "You do not have permission to update this item",
      };
    }

    const updatedCartItem = await db.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: quantity,
      },
    });

    return {
      success: true,
      message: "Cart item quantity updated successfully",
      cartItem: updatedCartItem,
    };
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return {
      success: false,
      message: "Failed to update cart item quantity",
    };
  }
}