/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Link from "next/link";
import React, { Suspense } from "react";
import { getProductsGroupedByCategory } from "@/actions/product";
import Image from "next/image";
import { HeroSkeletonGrid } from "./ui/skeleton";

function HeroPage() {
  return (
    <Suspense fallback={<HeroSkeletonGrid />}>
      <Hero />
    </Suspense>
  );
}
const Hero = async () => {
  const groupedProducts = await getProductsGroupedByCategory();
  //console.log(groupedProducts);
  
  const categoryEntries = Object.entries(groupedProducts);
  //console.log(categoryEntries);
  

  return (
    <section className="min-h-screen p-10 max-w-[1300px] w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categoryEntries.map(([categoryName, products], index) => (
          <Link href={`/search?category=${categoryName}`} key={index}>
            <div className="bg-white rounded-xl shadow  h-[500px]">
              <div className="p-4 border-b text-center">
                <h2 className="text-xl font-semibold uppercase">
                  {categoryName}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4">
                {products.slice(0, 4).map((product, i) => (
                  <Image
                    key={i}
                    src={product.thumbnail}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="w-[200px] h-[200px] object-cover"
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                    quality={75}
                    priority={false}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HeroPage;
