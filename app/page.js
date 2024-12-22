import Hero from "@/components/Hero";
import PopularMovie from "@/components/movies/PopularMovie";
import TopRated from "@/components/movies/TopRated";
import TrendingNow from "@/components/movies/TrendingNow";
import Upcoming from "@/components/movies/UpComing";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <TrendingNow />
        <PopularMovie />
        <TopRated />
        <Upcoming />
      </div>
    </>
  );
}
