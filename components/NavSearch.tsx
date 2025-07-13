// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
//import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import ProductSearchForm from "./ProductSearchForm"; // Assuming you’re using your own search form

const NavSearch = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Card className="p-3 bg-black text-white rounded-none shadow-none">
      <nav className="flex items-center justify-between gap-4">
        {/* Logo and delivery info */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/Screenshot 2025-07-10 141309.png"
              alt="logo"
              height={60}
              width={60}
              className="rounded-md"
            />
          </Link>
          <div className="text-sm leading-tight">
            <p className="text-gray-300">Deliver to Anurag</p>
            <p className="text-gray-400">Moradabad</p>
          </div>
        </div>

        {/* Search form */}
        <div className="w-1/2">
          <ProductSearchForm />
          {/* OR if not using that, replace with:
          <Input placeholder="Search products..." className="w-full" />
          */}
        </div>

        {/* Cart info */}
        <Link href={`/cart`}>
          <Button variant="ghost" className="relative text-white hover:text-yellow-400">
            <ShoppingCart className="h-10 w-10 ,r-" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full">
                {totalItems}
              </Badge>
            )}
          </Button>
        </Link>
      </nav>
    </Card>
  );
};

export default NavSearch;
