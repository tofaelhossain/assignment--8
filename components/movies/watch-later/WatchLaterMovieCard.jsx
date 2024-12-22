import Image from "next/image";

import { placeholderBase64 } from "@/utils/imagePlaceholders";
import Link from "next/link";
import WatchLaterRemoveButton from "./WatchLaterRemoveButton";

export default function WatchLaterMovieCard({ movie, user_id, onDelete }) {
  return (
    <div className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-[450px] object-cover"
        width={300}
        height={300}
        placeholder="blur"
        blurDataURL={placeholderBase64}
      />

      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h2 className="text-xl font-bold text-light mb-2">{movie.title}</h2>
        <div className="flex justify-between items-center">
          <span className="text-primary">
            {movie.release_date.split("-")[0]}
          </span>
          <Link href={`/movie/${movie.movie_id}`}>
            <button className="bg-gray-400 text-black px-3 py-1 rounded-full hover:bg-primary-dark transition">
              Details
            </button>
          </Link>
          <WatchLaterRemoveButton
            movie_id={movie.movie_id}
            user_id={user_id}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
}
