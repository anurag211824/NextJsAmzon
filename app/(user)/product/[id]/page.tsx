/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
//@ts-nocheck
"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/actions/product";
import { AddTocart } from "@/actions/cart";
import { AppContext } from "@/context/Appcontext";

type Product = {
  id: number;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  tags?: string[];
};

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);

  const { id } = useParams();
  console.log(id);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { user,fetchCartItems} = useContext(AppContext);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setProduct(productData);
        console.log(productData);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };
    fetchProduct();
  }, [id]);
  const handleadddTocart = async () => {
    // Add validation to check if user exists and has a valid ID
    if (!user || !user.id || user.id.trim() === "") {
      console.error("User not logged in or invalid user ID");
      return;
    }

    if (!id || id.toString().trim() === "") {
      console.error("Invalid product ID");
      return;
    }

    try {
      const res = await AddTocart(user.id, id);
      if (res.success) {
        fetchCartItems()
        console.log(res.cartItem);
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  if (!product) {
    return <div className="p-4">Loading product details...</div>;
  }

  // Add check for user before showing add to cart button
  if (!user || !user.id) {
    return (
      <div className="max-w-6xl mt-5 mx-auto p-6 bg-white shadow-md rounded-xl">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Please log in to view product details and add items to cart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mt-5 mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-md rounded-xl">
      <div className="flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full max-w-lg object-cover rounded-lg shadow-sm"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {product.title}
        </h1>

        <p className="text-gray-700 mb-4">{product.description}</p>

        <div className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Brand:</span> {product.brand}
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Category:</span> {product.category}
        </div>

        <div className="mb-3">
          <span className="text-2xl font-bold text-green-700">
            $
            {(
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(2)}
          </span>
          <span className="ml-2 line-through text-gray-500 text-sm">
            ${product.price}
          </span>
          <span className="ml-2 text-sm text-red-600">
            ({product.discountPercentage}% OFF)
          </span>
        </div>
        <div className="text-yellow-600 font-semibold mb-2">
          Rating: {product.rating} ⭐
        </div>

        <div
          className={`mb-4 font-medium ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </div>

        {Array.isArray(product.tags) && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={handleadddTocart}
          className="text-white bg-green-500 px-4 py-2 rounded-md w-fit hover:bg-green-600"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
