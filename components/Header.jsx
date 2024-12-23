"use client";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Correct import
import { useEffect, useState } from "react";

import SignInOut from "./auth/SignInOut";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const pathname = usePathname(); // Get the current path

  // Use the debounce hook with a delay of 500ms
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // When the debounced query changes, update the URL
  useEffect(() => {
    if (debouncedSearchQuery) {
      router.push(
        `/movie/search?query=${encodeURIComponent(debouncedSearchQuery)}`
      );
    }
  }, [debouncedSearchQuery, router]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear search query when navigating away from the search page
  useEffect(() => {
    if (!pathname.includes("/search")) {
      setSearchQuery(""); // Clear search query when navigating to non-search pages
    }
  }, [pathname]); // Listen for pathname changes

  const shouldHideLinks =
    pathname.includes("/login") || pathname.includes("/register");

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-black to-transparent">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-red-600 text-4xl font-bold">
            MOVIE DB
          </Link>
          <div className="ml-8 space-x-4">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            {!shouldHideLinks && (
              <>
                <Link
                  href="/compare"
                  className="text-white hover:text-gray-300"
                >
                  Compare Movies
                </Link>

                <Link
                  href="/watchList"
                  className="text-white hover:text-gray-300"
                >
                  Watch Later
                </Link>
              </>
            )}
          </div>
        </div>
        {!shouldHideLinks && (
          <>
            <div className="flex items-center">
              <SignInOut />
            </div>

            <div className="relative">
              <input
                type="text"
                id="searchInput"
                placeholder="Search movies..."
                className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div
                id="searchResults"
                className="absolute w-full mt-2 bg-black bg-opacity-90 rounded-lg hidden"
              ></div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
