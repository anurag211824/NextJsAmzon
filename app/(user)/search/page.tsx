/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
//@ts-nocheck
import { getProductByCategory } from "@/actions/product";
import Link from "next/link";
import React from "react";

const ProductsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const category = params?.category || "";
  const minPrice = Number(params?.minPrice) || 0;
  const maxPrice = Number(params?.maxPrice) || Infinity;
  const minRating = Number(params?.minRating) || 0;
  const sortBy = params?.sortBy || "none";

  const data = await getProductByCategory(category);
  let products = data;
  if (category) {
    products = products.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        product.rating >= minRating
    );
    if (sortBy === "price-asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    }
  }
  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="w-full lg:w-64 p-4 border-r">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <form method="GET" className="flex flex-col space-y-4">
          <input type="hidden" name="category" value={category} />
          <div>
            <label className="block text-sm">Min Price</label>
            <input
              name="minPrice"
              type="number"
              min="0"
              className="w-full border px-2 py-1 rounded"
              placeholder="enter minPrice"
            />
          </div>

          <div>
            <label className="block text-sm">Max Price</label>
            <input
              name="maxPrice"
              type="number"
              min="0"
              className="w-full border px-2 py-1 rounded"
              placeholder="enter maxPrice"
            />
          </div>

          <div>
            <label className="block text-sm">Min Rating</label>
            <input
              name="minRating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              className="w-full border px-2 py-1 rounded"
              placeholder="enter rating"
            />
          </div>

          <div>
            <label className="block text-sm">Sort By</label>
            <select name="sortBy" className="w-full border px-2 py-1 rounded">
              <option value="none">None</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:opacity-90"
          >
            Apply Filters
          </button>
        </form>
      </aside>
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">
          {category ? `Category: ${category}` : "All Products"}
        </h1>

        {products.length === 0 ? (
          <p>No data found for selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <div className="border p-4 rounded shadow">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover mb-2"
                  />
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-gray-600">${product.price}</p>
                  <p className="text-yellow-600 text-sm mb-5">
                    Rating: {product.rating}
                  </p>
                  <Link
                    className="bg-green-400 p-2 text-white font-bold rounded-md "
                    href={`/product/${product.id}`}
                  >
                    View Product
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
