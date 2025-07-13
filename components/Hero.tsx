/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import Link from "next/link";
import React, { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

 function HeroPage(){
    return (
      <>
      <Suspense fallback={
       <Skeleton>
        Loading.....
       </Skeleton>
      }>
        <Hero/>
      </Suspense>
      
      </>
    )
}

 async function fetchProducts(api) {
  const res = await fetch(api);
  const data = await res.json();
  return data.products;
}


const Hero = async () => {
const api = "https://dummyjson.com/products?limit=194"
const products =  await fetchProducts(api)
const categoryMap = {};

products.forEach((product) => {
  const category = product.category;

  if (!categoryMap[category]) {
    categoryMap[category] = [];
  }

  categoryMap[category].push(product);
});

const uniqueCategoryProducts = Object.values(categoryMap);
    

   return (
    <section className="min-h-screen p-10 bg-gray-50">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {uniqueCategoryProducts.map((categoryGroup, index) => {
          if (!categoryGroup.length) return null;

          const category = categoryGroup[0].category;

          return (
            <Link href={`/search?category=${category}`}  key={index}>
            
            <div
              key={index}
              className="bg-white rounded-xl shadow"
            >
  
              <div className="p-4 border-b text-center">
                <h2 className="text-xl font-semibold">{category}</h2>
              </div>
              <div className="grid grid-cols-2 gap-2 p-4">
                {categoryGroup.slice(0, 5).map((item, i) => (
                  <img
                    key={i}
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>
            
            
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default HeroPage
