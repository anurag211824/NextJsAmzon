import { getAllProducts } from "@/actions/product";
import { NextRequest, NextResponse } from "next/server";
import db from "@/service/prisma";
export  async function GET (req){
    const products =  await getAllProducts()
    return NextResponse.json({
        success : true,
        data: products,
    })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newProduct = await db.product.create({
      data: {
        title: body.title,
        description: body.description,
        brand: body.brand,
        category: body.category,
        price: body.price,
        originalPrice: body.originalPrice,
        discountPercentage: body.discountPercentage,
        rating: body.rating,
        availabilityStatus: body.availabilityStatus,
        tags: body.tags,
        thumbnail: body.thumbnail,
      },
    });

    return NextResponse.json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add product",
      },
      { status: 500 }
    );
  }
}
