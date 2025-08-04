// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
"use client";
import Link from "next/link";
// import { Badge } from "@/components/ui/badge";
import { LucideShoppingCart, Shield, User } from "lucide-react";
import ProductSearchForm from "./ProductSearchForm";
import { logOutUser } from "@/actions/user";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/Appcontext";

const NavSearch = () => {
  const router = useRouter();
  const [openprofile, setOpenprofile] = useState(false);
  const { user,cartQuantity,fetchCartItems} = useContext(AppContext);

  useEffect(()=>{
  fetchCartItems()
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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

        {/* Cart and User and admin */}
        <div className="flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative flex-1">
              <User
                onClick={() => setOpenprofile(!openprofile)}
                className="h-6 w-6 sm:h-8 sm:w-8 cursor-pointer"
              />

              {openprofile && (
                <div className=" flex flex-col gap-2 absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-4">
                  {user.role === "ADMIN" && (
                    <Link href="/admin">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700"
                      >
                        <Shield className="h-4 w-4 mr-1" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  {user.name != "" ? (
                    <Button
                      onClick={() => {
                        logOutUser();
                      }}
                    >
                      Logout
                    </Button>
                    
                  ) : (
                    <Button onClick={() => router.push("/sign-in")}>
                      Login
                    </Button>
                  )}
                 <p className="text-black"> {user.name}</p>
                </div>
              )}
            </div>

            <Link
              href={`/cart`}
              className="relative text-white hover:text-yellow-400 transition-colors p-2"
            >
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
              <LucideShoppingCart className="h-6 w-6 sm:h-8 sm:w-8" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavSearch;
