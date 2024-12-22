const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function getMoviesByCategory(category) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY; // Store your TMDB API key in .env.local
  const TMDB_API_URL = `${NEXT_PUBLIC_BASE_URL}/${category}?api_key=${TMDB_API_KEY}`;

  try {
    const response = await fetch(TMDB_API_URL);
    if (!response.ok) throw new Error("Failed to fetch TMDB data");

    const data = await response.json();
    //return Response.json(data); // Return data as JSON
    return data || [];
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function getMoviesById(movieId) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY; // Store your TMDB API key in .env.local
  const TMDB_API_URL = `${NEXT_PUBLIC_BASE_URL}/${movieId}?api_key=${TMDB_API_KEY}`;

  try {
    const response = await fetch(TMDB_API_URL);
    if (!response.ok) throw new Error("Failed to fetch TMDB data");

    const data = await response.json();
    //return Response.json(data); // Return data as JSON
    return data;
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function getSimilarMoviesById(movieId) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY; // Store your TMDB API key in .env.local
  const TMDB_API_URL = `${NEXT_PUBLIC_BASE_URL}/${movieId}/similar`;

  try {
    const response = await fetch(TMDB_API_URL);
    if (!response.ok) throw new Error("Failed to fetch TMDB data");

    const data = await response.json();
    //return Response.json(data); // Return data as JSON
    return data;
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function getMovieDetailsWithCast(movieId) {
  const MOVIE_DETAILS_URL = `${NEXT_PUBLIC_BASE_URL}/${movieId}/credits`;

  try {
    const response = await fetch(MOVIE_DETAILS_URL);
    if (!response.ok) throw new Error("Failed to fetch TMDB data");

    const data = await response.json();
    //return Response.json(data); // Return data as JSON
    return data;
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

//
