"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInUser } from "@/actions/user";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router =  useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
       setIsLoading(true);
       setError("");
   
       try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
         const result = await signInUser(formData);
         if (!result.success) {
           setError(result.message);
         } else {
          router.push("/")
         }
       } catch (err) {
         console.log(err);
         setError("Something went wrong. Please try again.");
       } finally {
         setIsLoading(false);
       }
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[400px] mx-auto p-6 bg-white rounded-lg shadow-md">
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
            fill="#000000"
            className="sm:text-[20px]"
          >
            Shopfinity
          </text>
        </svg>
        <h2 className="text-xl font-bold mb-6 text-left">Sign In</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
