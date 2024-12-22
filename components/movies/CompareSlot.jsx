"use client";
import Image from "next/image";
import { useState } from "react";
import CompareModal from "./CompareModal";

export default function CompareSlot({ slotId, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      //const response = await getMoviesById(movieId);
      //const data = await response.json();
      const response = await fetch(`/api/movie/${movieId}`);
      const data = await response.json();
      setSelectedMovie(data); // Update state with detailed movie data
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleMovieSelect = (movie) => {
    //console.log({ selectedMovie, movie });
    fetchMovieDetails(movie);
    //setSelectedMovie(movie);
    setIsModalOpen(false); // Close the modal after selecting
  };

  return (
    <>
      <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
        <div className="flex justify-end mb-4">
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => onClose(slotId)}
          >
            ✕
          </button>
        </div>
        {selectedMovie ? (
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-2 h-full">
              <Image
                src={`https://image.tmdb.org/t/p/original${selectedMovie?.poster_path}`}
                alt={selectedMovie?.title}
                className="w-full rounded-lg mb-4 object-contain max-h-full"
                width={100}
                height={100}
              />
              <h2 className="text-xl font-bold mb-2 text-center">
                {selectedMovie?.title}
              </h2>
            </div>
            <div className="w-full space-y-4 col-span-3">
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Rating:</span>
                <span className="float-right">
                  {selectedMovie?.vote_average}/10
                </span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Release Year:</span>
                <span className="float-right">
                  {selectedMovie?.release_date?.split("-")[0] || "N/A"}
                </span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Runtime:</span>
                <span className="float-right">
                  {selectedMovie?.runtime} min
                </span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Budget:</span>
                <span className="float-right">
                  {selectedMovie?.budget
                    ? `$${(selectedMovie?.budget / 1000000).toFixed(1)}M`
                    : "N/A"}
                </span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Revenue:</span>
                <span className="float-right">
                  {selectedMovie?.revenue
                    ? `$${(selectedMovie?.revenue / 1000000).toFixed(0)}M`
                    : "N/A"}
                </span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Genres:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedMovie?.genres && selectedMovie?.genres.length > 0 ? (
                    selectedMovie?.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-zinc-700 px-2 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No genres available</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center">
            <button
              className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
              onClick={handleOpenModal}
            >
              Select Movie
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <CompareModal
          onClose={handleCloseModal}
          slotId={slotId}
          onMovieSelect={handleMovieSelect}
        />
      )}
    </>
  );
}
