import { getSimilarMoviesById } from "@/app/api/movies/movie-info";
import Image from "next/image";
import Link from "next/link";

export default async function SimilarMovies({ movieId }) {
  const similarMovies = await getSimilarMoviesById(movieId);
  //console.log("similar movies = ", similarMovies);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <>
      {similarMovies?.results.length > 0 ? (
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {similarMovies?.results.map((movie) => (
            <div
              className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
              key={movie?.id}
            >
              <Link href={`/movie/${movie?.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt={movie?.title}
                  className="w-full rounded-lg"
                  width={200}
                  height={200}
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No similar movies found.
        </div>
      )}
    </>
  );
}
