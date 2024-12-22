"use client";
export default function WatchLaterRemoveButton({
  movie_id,
  user_id,
  onDelete,
}) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(movie_id, user_id); // Pass movie_id and user_id to the onDelete function
    }
  };
  return (
    <button
      className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition"
      onClick={handleDelete}
    >
      Remove
    </button>
  );
}
