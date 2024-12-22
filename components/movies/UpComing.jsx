import { getMoviesByCategory } from "@/app/api/movies/movie-info";
import Image from "next/image";
import Link from "next/link";

export default async function Upcoming() {
  let movies = [];
  let error = null;

  try {
    const response = await getMoviesByCategory("upcoming");

    movies = response?.results || [];
  } catch (err) {
    error = { error: true, message: "Error fetching upcoming movies" };
  }

  if (error) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Movies</h2>
        <p>{error.message}</p>
      </section>
    );
  }

  if (!movies.length) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Movies</h2>
        <p>No movies available at the moment.</p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Up Coming</h2>
      <div id="trendingMovies" className="flex space-x-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <div
            className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
            key={movie?.id}
          >
            <Link href={`/movie/${movie?.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie?.original_title}
                className="w-full rounded-lg"
                width={100}
                height={100}
              />
              <div className="mt-2">
                <h3 className="text-light text-sm font-bold truncate">
                  {movie.title}
                </h3>
                <p className="text-primary text-xs">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
