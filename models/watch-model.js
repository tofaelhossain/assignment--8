import mongoose from "mongoose";

const watchListSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    movie_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const watchModel =
  mongoose.models.watchlist || mongoose.model("watchlist", watchListSchema);

export default watchModel;
