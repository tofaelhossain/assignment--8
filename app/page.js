import Hero from "@/components/Hero";
import PopularMovie from "@/components/movies/PopularMovie";
import TopRated from "@/components/movies/TopRated";
import TrendingNow from "@/components/movies/TrendingNow";
import Upcoming from "@/components/movies/UpComing";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading Trending Movies...</div>}>
          <TrendingNow />
        </Suspense>
        <Suspense fallback={<div>Loading Popular Movies...</div>}>
          <PopularMovie />
        </Suspense>
        <Suspense fallback={<div>Loading Top Rated Movies...</div>}>
          <TopRated />
        </Suspense>
        <Suspense fallback={<div>Loading Upcoming Movies...</div>}>
          <Upcoming />
        </Suspense>
      </div>
    </>
  );
}
