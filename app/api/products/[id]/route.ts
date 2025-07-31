import { NextRequest, NextResponse } from "next/server";
import db from "@/service/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id || "";

  const product = await db.product.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
    data: product,
  });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id || "";

  await db.product.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
    data: "successfully deleted",
  });
}