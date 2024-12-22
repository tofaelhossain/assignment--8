"use client";

import {
  addToWatchList,
  checkMovieInWatchList,
  removeFromDBWatchList,
} from "@/app/actions";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddSvg from "./AddSvg";
import CheckSvg from "./CheckSvg";

export default function WatchListButton({ movie }) {
  const [isInWatchlist, setIsInWatchlist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { auth } = useAuth();

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      if (auth?.id && movie?.id) {
        try {
          const result = await checkMovieInWatchList({
            user_id: auth.id,
            movie_id: movie.id,
          });
          console.log("Watchlist status fetched:", result.isInWatchlist);
          setIsInWatchlist(result.isInWatchlist); // Set the watchlist status
        } catch (error) {
          console.error("Error fetching watchlist status:", error);
        }
      }
    };

    checkWatchlistStatus(); // Check the watchlist status on component mount
  }, [auth, movie]);

  const toggleWatchlist = async () => {
    if (!auth?.id) {
      //console.error("User is not authenticated.");
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);

      if (isInWatchlist) {
        const response = await removeFromDBWatchList({
          user_id: auth.id,
          movie_id: movie.id,
        });
        if (response?.success) {
          setIsInWatchlist(false); // Update state if successfully removed
        } else {
          console.error(
            "Failed to remove movie from watchlist:",
            response?.message
          );
        }
      } else {
        const response = await addToWatchList({ movie, user_id: auth.id });
        if (response?.success) {
          setIsInWatchlist(true);
        } else {
          console.error("Failed to update watchlist:", response?.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={toggleWatchlist}
      className={`flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg ${
        isInWatchlist ? "text-green-600" : ""
      }`}
    >
      {isLoading ? (
        "Processing..."
      ) : isInWatchlist ? (
        <>
          <CheckSvg /> Added to Watch List
        </>
      ) : (
        <>
          <AddSvg /> Add to Watch List
        </>
      )}
    </button>
  );
}
