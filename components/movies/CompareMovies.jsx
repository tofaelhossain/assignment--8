"use client";
import { useState } from "react";
import CompareSlot from "./CompareSlot";
export default function CompareMovies() {
  const [slots, setSlots] = useState([
    { id: Date.now() }, // First slot
    { id: Date.now() + 1 }, // Second slot
  ]);

  const handleAddSlot = () => {
    setSlots([...slots, { id: Date.now() }]);
  };

  const handleClose = (id) => {
    setSlots(slots.filter((slot) => slot.id !== id)); // Remove the specific slot
  };
  return (
    <main className="container mx-auto px-4 pt-24 pb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Compare Movies</h1>
        <button
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
          onClick={handleAddSlot}
        >
          Add Movie +
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* <div className="bg-zinc-900 rounded-lg p-4 flex flex-col">
          <div className="flex justify-end mb-4">
            <button
              onclick="removeSlot('slot-1732378356021')"
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-2 h-full">
              <img
                src="https://image.tmdb.org/t/p/original/yfK7zxNL63VWfluFuoUaJj5PdNw.jpg"
                alt="Snowden"
                className="w-full rounded-lg mb-4 object-contain max-h-full"
              />
              <h2 className="text-xl font-bold mb-2 text-center">Snowden</h2>
            </div>
            <div className="w-full space-y-4 col-span-3">
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Rating:</span>
                <span className="float-right">7.1/10</span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Release Year:</span>
                <span className="float-right">2016</span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Runtime:</span>
                <span className="float-right">134 min</span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Budget:</span>
                <span className="float-right">$40.0M</span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Revenue:</span>
                <span className="float-right">$37.4M</span>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <span className="text-gray-400">Genres:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                    Drama{" "}
                  </span>
                  <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                    History{" "}
                  </span>
                  <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                    Crime{" "}
                  </span>
                  <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                    Thriller
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {slots.map((slot) => (
          <CompareSlot key={slot.id} onClose={handleClose} slotId={slot.id} />
        ))}
      </div>
    </main>
  );
}
