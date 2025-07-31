/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use server";
import db from "@/service/prisma";
export async function getProductsGroupedByCategory() {
  const products = await db.product.findMany();
  const grouped = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return grouped;
}

export async function getAllProducts(){
    const products = db.product.findMany()
    return products;
}



export async function getProductByCategory(category: string) {
  try {
    const products = await db.product.findMany({
      where: {
        category: {
          equals: category,
          mode: "insensitive",
        },
      },
    });

    return products;
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    return null;
  }
}




// export async function getProductSuggestions(query: string) {
//  //@ts-ignore
//   const regex = new RegExp(query, "i");
//   const products = await prisma.product.findMany({
//     where: {
//       OR: [
//         { title: { contains: query, mode: "insensitive" } },
//         { brand: { contains: query, mode: "insensitive" } },
//         { tags: { hasSome: [query] } }, // for exact tag matches
//         // or use: tags: { array_contains_some_regex: regex } – but Prisma Mongo doesn’t natively support regex on arrays
//       ],
//     },
//     select: {
//       title: true,
//     },
//   });

//   const uniqueTitles = Array.from(new Set(products.map(p => p.title)));
//   return uniqueTitles;
// }