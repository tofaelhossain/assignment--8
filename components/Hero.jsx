import HeroImg from "@/public/Hero-assignment-8.jpg";

export default function Hero() {
  return (
    <div
      id="hero"
      className="relative h-screen"
      style={{
        backgroundImage: `url(${HeroImg.src})`, // Correct syntax
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black"></div>

      {/* Content Section */}
      <div className="absolute bottom-0 left-0 p-12 text-white">
        <h1 id="heroTitle" className="text-5xl font-bold mb-4">
          Venom: The Last Dance
        </h1>
        <p id="heroOverview" className="text-lg max-w-2xl mb-4">
          {`Eddie and Venom are on the run. Hunted by both of their worlds and
          with the net closing in, the duo are forced into a devastating
          decision that will bring the curtains down on Venom and Eddie's last
          dance.`}
        </p>
        <button className="bg-white text-black px-8 py-2 rounded-lg font-bold hover:bg-opacity-80 transition">
          ▶ Play
        </button>
      </div>
    </div>
  );
}
