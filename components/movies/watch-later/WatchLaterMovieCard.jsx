import Image from "next/image";

import { placeholderBase64 } from "@/utils/imagePlaceholders";
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
