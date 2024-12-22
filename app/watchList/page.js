import WatchLaterMovieList from "@/components/movies/watch-later/WatchLaterMovieList";

export default function watchListPage() {
  return (
    <div className="container mx-auto pt-24 pb-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Watch Later</h1>
        <p className="text-light/70 mt-2">
          Movies you've saved to watch in the future
        </p>
      </header>

      <WatchLaterMovieList />
    </div>
  );
}
