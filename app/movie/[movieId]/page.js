import { getMovieDetailsWithCast } from "@/app/api/movies/movie-info";
import MovieCardLoading from "@/components/movies/MovieCardLoading";
import ShareOnMedia from "@/components/movies/ShareOnMedia";
import SimilarMovies from "@/components/movies/SimilarMovies";
import WatchListButton from "@/components/movies/WatchListButton";
import { formatDate } from "@/utils/dateFormat";
import { placeholderBase64 } from "@/utils/imagePlaceholders";
import Image from "next/image";
import { Suspense } from "react";

export default async function MovieDetailsPage({ params: { movieId } }) {
  const movie = await getMovieDetailsWithCast(movieId);
  //console.log(movie);
  return (
    <>
      <div id="movieDetails" className="min-h-screen pt-20 mb-8">
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
              width={2000}
              height={3000}
              placeholder="blur"
              blurDataURL={placeholderBase64}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70"></div>
          </div>

          <div className="relative container mx-auto px-4 pt-32">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt="Smile 2"
                  className="w-full rounded-lg shadow-lg"
                  width={2000}
                  height={3000}
                  placeholder="blur"
                  blurDataURL={placeholderBase64}
                  priority
                />
              </div>

              <div className="md:w-2/3">
                <h1 className="text-4xl font-bold mb-4">{movie?.title}</h1>

                <div className="flex items-center mb-4 space-x-4">
                  <span className="text-green-500">
                    {" "}
                    {formatDate(movie?.release_date)}{" "}
                  </span>
                  <span>| </span>
                  <span>{movie?.runtime} min</span>
                </div>

                <p className="text-lg mb-6">{movie?.overview}</p>

                <div className="mb-6">
                  <h3 className="text-gray-400 mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie?.genres?.length > 0 &&
                      movie?.genres.map((gen) => (
                        <span
                          className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                          key={gen.id}
                        >
                          {gen?.name}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-gray-400 mb-2">Cast</h3>
                  <div className="flex flex-wrap gap-4">
                    {movie?.cast && movie.cast.length > 0 ? (
                      movie.cast.slice(0, 5).map((cas) => (
                        <div className="text-center" key={cas.id}>
                          <Image
                            src={
                              cas?.profile_path
                                ? `https://image.tmdb.org/t/p/original/${cas.profile_path}`
                                : "/default-placeholder.png" // Fallback placeholder if profile_path is missing
                            }
                            alt={cas?.name}
                            className="w-24 h-24 rounded-full object-cover mb-2"
                            width={200}
                            height={200}
                            placeholder="blur"
                            blurDataURL={placeholderBase64}
                          />
                          <p className="text-sm">{cas?.name}</p>
                        </div>
                      ))
                    ) : (
                      <p>No cast information available.</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="text-center">
                      <WatchListButton movie={movie} />
                    </div>
                  </div>
                </div>
                <ShareOnMedia movie={movie} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">More Like This</h2>
        <Suspense fallback={<MovieCardLoading numberOfCards={7} />}>
          <SimilarMovies movieId={movieId} />
        </Suspense>
      </div>
    </>
  );
}
