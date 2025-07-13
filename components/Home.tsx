/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import React from 'react'
export async function fetchProducts(api){
    const res= await fetch(api)
    const data =  await res.json()
    return data.products
}
const Home = async () => {
const api = "https://dummyjson.com/products?limit=194"
const products = await fetchProducts(api)
const categoryMap = {}
products.forEach((product)=>{
    const category = product.category

    if(!categoryMap[category]){
        categoryMap[category] = []
    }
    categoryMap[category].push(product)
})
console.log(categoryMap);
const uniqueCategoryProducts = Object.values(categoryMap);
console.log(uniqueCategoryProducts);

  return (
    <div>
      hiiii
    </div>
  )
}

export default Home
