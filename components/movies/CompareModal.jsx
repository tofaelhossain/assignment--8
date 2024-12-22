import Image from "next/image";
import { useEffect, useState } from "react";
//import useDebounce from "../hooks/useDebounce"; // Import the debounce hook

import useDebounce from "@/hooks/useDebounce";

export default function CompareModal({ onClose, onMovieSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce the search query
  const debouncedQuery = useDebounce(searchQuery, 500); // 500ms delay

  const searchMovies = async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/movie/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (response.ok) {
        setMovies(data.results || []);
      } else {
        setError(data.error || "Failed to fetch movies.");
      }
    } catch (err) {
      setError("An error occurred while fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger the search when the debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      searchMovies(debouncedQuery);
    } else {
      setMovies([]); // Clear movies if there's no query
    }
  }, [debouncedQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMovieClick = (movie) => {
    onMovieSelect(movie); // Pass the selected movie to the parent
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Search Movie</h2>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            ✕
          </button>
        </div>
        <input
          type="text"
          placeholder="Type movie name..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="text-center text-gray-400 py-4">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">{error}</div>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
                onClick={() => handleMovieClick(movie.id)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded"
                  width={100}
                  height={100}
                />
                <div>
                  <h3 className="font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-400">
                    {movie.release_date?.split("-")[0] || "N/A"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-4">
              No movies found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
