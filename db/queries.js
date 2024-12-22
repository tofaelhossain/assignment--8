import userModel from "@/models/user-model";
import watchModel from "@/models/watch-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data.utils";

async function createUser(user) {
  //return await userModel.create(user);

  try {
    const newUser = await userModel.create(user);
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
}

async function findUserByCredentials(credential) {
  const user = await userModel.findOne(credential).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }

  return null;
}

async function createWatchList(watchlist) {
  try {
    const newWatchEntry = await watchModel.create(watchlist);
    return newWatchEntry;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
}

async function findMovieInWatchList({ user_id, movie_id }) {
  try {
    //console.log("Checking if movie is in watchlist:", { user_id, movie_id });
    const isInWatchlist = await watchModel.exists({ user_id, movie_id });
    //console.log("Watchlist status:", isInWatchlist);
    //return replaceMongoIdInObject(isInWatchlist) || false;
    return !!isInWatchlist;
  } catch (error) {
    //console.error("Error checking watchlist:", error);
    throw new Error("Error checking if movie is in watchlist");
  }
}

async function removeFromWatchList({ user_id, movie_id }) {
  //console.log("queries========>", user_id, movie_id);
  try {
    const result = await watchModel.deleteMany({ user_id, movie_id });
    if (result.deletedCount > 0) {
      return { success: true, message: "Movie removed from watchlist." };
    } else {
      return { success: false, message: "Movie not found in watchlist." };
    }
  } catch (error) {
    console.error("Error removing movie from watchlist:", error);
    throw new Error("Error removing movie from watchlist");
  }
}

async function getWatchlistByUser({ user_id }) {
  try {
    // Find all watchlist entries for the specific user
    const watchlist = await watchModel.find({ user_id }).lean();
    //console.log("Fetched watchlist from DB:", watchlist);
    // Return the list of movies in the user's watchlist

    if (watchlist) {
      return replaceMongoIdInArray(watchlist);
    }
    return null;
  } catch (error) {
    console.error("Error fetching user's watchlist:", error);
    throw new Error("Error fetching watchlist");
  }
}

export {
  createUser,
  createWatchList,
  findMovieInWatchList,
  findUserByCredentials,
  getWatchlistByUser,
  removeFromWatchList,
};
