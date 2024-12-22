"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Correct import for App Directory
import { useEffect, useState } from "react";

const SearchResults = () => {
  const searchParams = useSearchParams(); // Get query parameters from URL
  const query = searchParams.get("query"); // Extract the query parameter
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return; // Don't fetch if no query parameter is present

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/movie/search?query=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        if (response.ok) {
          setResults(data.results);
        } else {
          setError(data.error || "Failed to fetch results.");
        }
      } catch (err) {
        setError("An error occurred while fetching results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]); // Re-fetch when query changes

  return (
    <main class="container mx-auto px-4 pt-24 pb-8">
      <div class="mb-6">
        <h1 class="text-2xl font-bold">Search Results for "{query}"</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <p class="text-gray-400">Found {results.length} results</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.length > 0 ? (
          results.map((movie) => (
            <Link
              href={`/movie/${movie?.id}`}
              class="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
              key={movie?.id}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                alt={movie?.title}
                class="w-full aspect-[2/3] object-cover"
                width={300}
                height={300}
              />
              <div class="p-4">
                <h3 class="font-bold mb-2">Avatar: The Way of Water</h3>
                <div class="flex justify-between text-sm text-gray-400">
                  <span>{movie?.release_date?.split("-")[0] || "N/A"}</span>
                  <span>⭐ {movie?.vote_average}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </main>
  );
};

export default SearchResults;
