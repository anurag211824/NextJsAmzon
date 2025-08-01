/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { addCartItem } from "@/redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { getProductsByTitle } from "@/actions/product";

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

const ProductPageByTitle = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { title } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const data =  await getProductsByTitle(decodeURIComponent(title))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const product =  Object.entries(data)[0][1]
           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setProduct(product)
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    if (title) {
      fetchProduct();
    }
  }, [title]);

  if (!product) {
    return <div className="p-4">Loading product details...</div>;
  }

  return (
   <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-md rounded-xl">
  <div className="flex items-center justify-center">
    <img
      src={product?.thumbnail || ""}
      alt={product?.title || ""}
      className="w-full max-w-lg object-cover rounded-lg shadow-sm"
    />
  </div>

  <div className="flex flex-col justify-center">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">
      {product?.title}
    </h1>

    <p className="text-gray-700 mb-4">{product?.description}</p>

    <div className="text-sm text-gray-600 mb-2">
      <span className="font-semibold">Brand:</span> {product?.brand}
    </div>

    <div className="text-sm text-gray-600 mb-4">
      <span className="font-semibold">Category:</span> {product?.category}
    </div>

    <div className="mb-3">
      <span className="text-2xl font-bold text-green-700">
        $
        {product
          ? (
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(2)
          : "0.00"}
      </span>

      <span className="ml-2 line-through text-gray-500 text-sm">
        ${product?.price}
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
      {(product.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
    </div>

    {product.tags && product.tags.length > 0 && (
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

  <Link href={`/cart/${product.id}`}>  <button
      onClick={() => dispatch(addCartItem(product))}
      className="text-white bg-green-500 px-4 py-2 rounded-md w-fit hover:bg-green-600"
    >
      Add To Cart
    </button></Link>
  </div>
</div>

  );
};

export default ProductPageByTitle;