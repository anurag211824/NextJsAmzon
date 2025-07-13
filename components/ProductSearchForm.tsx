/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProductSearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    const category = searchQuery.trim().toLowerCase();

    if (!category) return;

   router.push(`/search?category=${category}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl border border-white rounded overflow-hidden"
    >
      <select className="text-black bg-white" name="products" id="products">
        <option value="all">All</option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>

      </select>
      <input
        type="text"
        placeholder="Enter category"
        className="flex-grow px-4 py-2 outline-none text-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2"
      >
        Search
      </button>
    </form>
  );
};

export default ProductSearchForm;
