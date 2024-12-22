export default function MovieCardsLoading({ numberOfCards = 7 }) {
  // Create an array of placeholders for the number of cards to show
  const loadingCards = new Array(numberOfCards).fill(null);

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {loadingCards.map((_, index) => (
        <div
          className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
          key={index}
        >
          <div className="w-48 h-[288px] rounded-lg bg-zinc-800 relative">
            <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
              <div className="animate-pulse w-full h-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite]"></div>
            </div>

            {/* Add the loading text */}
            <div className="absolute inset-0 flex justify-center items-center text-white font-semibold text-lg">
              Loading similar movies...
            </div>

            {/* Placeholder for text */}
            <div className="absolute bottom-4 left-4 w-3/4 h-6 bg-zinc-600 rounded-md animate-pulse"></div>
            <div className="absolute bottom-2 left-4 w-2/4 h-4 bg-zinc-600 rounded-md animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
