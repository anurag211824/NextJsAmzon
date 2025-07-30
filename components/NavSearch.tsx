// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { LucideShoppingCart, User } from "lucide-react";
import ProductSearchForm from "./ProductSearchForm";

const NavSearch = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="w-full bg-black text-white">
      <nav className="flex items-center justify-between gap-1 px-2 sm:px-4 py-3 min-h-[60px]">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/">
            <svg
              width="120"
              height="40"
              viewBox="0 0 160 50"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-[160px] sm:h-[50px]"
            >
              {/* Shopping cart icon */}
              <g fill="#4f46e5" transform="translate(10, 10)">
                <rect x="0" y="5" width="3" height="15" rx="1.5" />
                <rect x="8" y="5" width="3" height="15" rx="1.5" />
                <rect x="0" y="5" width="11" height="3" rx="1.5" />
                <circle cx="2" cy="25" r="2" />
                <circle cx="10" cy="25" r="2" />
              </g>
              {/* Brand name */}
              <text
                x="35"
                y="32"
                fontFamily="'Segoe UI', sans-serif"
                fontSize="16"
                fontWeight="bold"
                fill="#ffffff"
                className="sm:text-[20px]"
              >
                Shopfinity
              </text>
            </svg>
          </Link>
        </div>

        <div className="flex-1 relative">
          <ProductSearchForm />
        </div>

        {/* Cart and User  */}
        <div className="flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="/account"
              className="text-white hover:text-yellow-400 transition-colors p-2"
            >
              <User className="h-6 w-6 sm:h-8 sm:w-8" />
            </Link>
            <Link
              href={`/cart`}
              className="relative text-white hover:text-yellow-400 transition-colors p-2"
            >
              <LucideShoppingCart className="h-6 w-6 sm:h-8 sm:w-8" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-400 text-black rounded-full text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-[20px] flex items-center justify-center font-bold">
                  {totalItems > 99 ? "99+" : totalItems}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavSearch;
