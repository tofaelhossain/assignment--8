"use server";

import {
  createUser,
  createWatchList,
  findMovieInWatchList,
  findUserByCredentials,
  findUserByEmail,
  getWatchlistByUser,
  removeFromWatchList,
} from "@/db/queries";
import connectMongo from "@/dbConnect/connectMongo";

//import { redirect } from "next/navigation";

/* async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  await connectMongo();
  await createUser(user);
  redirect("/login");
} */

async function registerUser(formData) {
  const { firstName, lastName, email, password } = formData;

  try {
    await connectMongo();
    // Check if the email already exists in the database
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email is already in use. Please choose another one.");
    }

    await connectMongo();
    // If the email doesn't exist, proceed with user creation
    const newUser = await createUser({ firstName, lastName, email, password });

    return { success: true, message: "User successfully created" };
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

async function performLogin(formData) {
  try {
    const creadential = {};
    creadential.email = formData.get("email");
    creadential.password = formData.get("password");
    await connectMongo();
    const found = await findUserByCredentials(creadential);

    return found;
  } catch (error) {
    throw error;
  }
}

async function addToWatchList({ movie, user_id }) {
  const movieData = {
    user_id,
    movie_id: movie?.id,
    title: movie?.title,
    poster_path: movie?.poster_path,
    release_date: movie?.release_date,
  };

  //console.log("Adding to watchlist:", movieData);

  await connectMongo(); // Ensure your database connection
  await createWatchList(movieData); // Save to the database

  return { success: true, message: "Movie added to watchlist" };
}

async function checkMovieInWatchList({ user_id, movie_id }) {
  try {
    // Check if movie is in the watchlist for the user
    await connectMongo();
    const isInWatchlist = await findMovieInWatchList({ user_id, movie_id });

    // Return the result
    return { isInWatchlist };
  } catch (error) {
    //console.error("Error checking if movie is in watchlist:", error);
    throw new Error("Error checking watchlist");
  }
}

async function removeFromDBWatchList({ user_id, movie_id }) {
  //console.log("action========>", user_id, movie_id);
  try {
    const result = await removeFromWatchList({ user_id, movie_id });
    return result;
  } catch (error) {
    //console.error("Error removing movie from watchlist:", error);
    throw new Error("Error removing movie from watchlist");
  }
}

async function getAllWatchlistOfUser({ user_id }) {
  try {
    await connectMongo();
    const result = await getWatchlistByUser({ user_id });
    return result;
  } catch (error) {
    //console.error("Error getting watchlist of user:", error);
    throw new Error("Error getting watchlist of user");
  }
}

export {
  addToWatchList,
  checkMovieInWatchList,
  getAllWatchlistOfUser,
  performLogin,
  registerUser,
  removeFromDBWatchList,
};
