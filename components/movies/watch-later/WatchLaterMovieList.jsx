"use client";
import { getAllWatchlistOfUser, removeFromDBWatchList } from "@/app/actions";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import WatchLaterEmptyList from "./WatchLaterEmptyList";
import WatchLaterMovieCard from "./WatchLaterMovieCard";

export default function WatchLaterMovieList() {
  const { auth } = useAuth();

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (auth?.id) {
        try {
          const allwatchlist = await getAllWatchlistOfUser({
            user_id: auth.id,
          });
          setWatchlist(allwatchlist); // Set the fetched watchlist data to state
        } catch (error) {
          console.error("Error fetching watchlist:", error);
        }
      }
    };

    fetchWatchlist();
  }, [auth]);

  const handleRemoveMovie = async (movie_id, user_id) => {
    try {
      // Example API call to remove the movie
      await removeFromDBWatchList({ user_id: user_id, movie_id });

      // Update the state by removing the movie from the watchlist
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((movie) => movie.movie_id !== movie_id)
      );
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };

  return (
    <div
      id="watchLaterList"
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {watchlist.length > 0 ? (
        watchlist.map((movie) => (
          <WatchLaterMovieCard
            key={movie.movie_id}
            movie={movie}
            user_id={auth?.id}
            onDelete={handleRemoveMovie}
          />
        ))
      ) : (
        <WatchLaterEmptyList />
      )}
    </div>
  );
}
