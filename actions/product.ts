/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use server";
import db from "@/service/prisma";
export async function getProductsGroupedByCategory() {
  const products = await db.product.findMany();
  const grouped = products.reduce((acc, product) => {
    const category = product.category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

//    console.log(typeof (grouped));
//   console.log(grouped);

  return grouped;
}
