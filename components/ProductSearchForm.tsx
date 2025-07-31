/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllProducts } from "@/actions/product";

const ProductSearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [displaySuggestion, setDisplaySuggestion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmitTitle = (title) => {
    setSearchQuery(title);
    setSuggestion([]);
    router.push(`/product/by-title/${encodeURIComponent(title)}`);
    setDisplaySuggestion(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = searchQuery.trim().toLowerCase();
    if (!category) return;
    router.push(`/search?category=${category}`);
    setDisplaySuggestion(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestion([]);
    setDisplaySuggestion(false);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length < 2) {
        return;
      }
      setIsLoading(true);
      try {
        const products = await getAllProducts();
        const productSuggestion = products
          .filter((item) => {
            const titleMatch = item.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
            const brandMatch = item.brand
              ?.toLocaleLowerCase()
              .includes(searchQuery.toLowerCase());
            const tagsMatch = item.tags.some((tag) => {
              return tag.toLowerCase().includes(searchQuery.toLowerCase());
            });
            return titleMatch || brandMatch || tagsMatch;
          })
          .map((item) => {
            return item.title;
          });

        const uniqueProductsSuggestions = Array.from(
          new Set(productSuggestion)
        );
        setSuggestion(uniqueProductsSuggestions);
        setDisplaySuggestion(uniqueProductsSuggestions.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <div className="relative">
        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
            }}
            className={cn(
              "pl-10 pr-20 py-2 text-black bg-white border-gray-300 focus:border-yellow-500 focus:ring-yellow-500",
              "placeholder:text-gray-500"
            )}
          />
          {/* Clear button */}
          {
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="h-full w-6 text-gray-400" />
            </Button>
          }
          {/* Search button */}
          <Button
            type="submit"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-1 rounded-l-none"
          >
            <Search className="h-full w-5" />
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        {displaySuggestion && (
          <Card className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border max-h-80 overflow-y-auto shadow-lg">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400 mx-auto"></div>
                <span className="block mt-2">Loading suggestions...</span>
              </div>
            ) : suggestion.length > 0 ? (
              <div className="">
                {suggestion.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSubmitTitle(item)}
                    className={cn(
                      "w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors",
                      "flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                    )}
                  >
                    <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-800 truncate">{item}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No products found for {searchQuery}
              </div>
            )}
          </Card>
        )}
      </div>
    </form>
  );
};

export default ProductSearchForm;
