export async function GET(request, { params: { movieId } }) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY; // Store your TMDB API key in .env.local
  const TMDB_API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;

  try {
    const response = await fetch(TMDB_API_URL);
    if (!response.ok) throw new Error("Failed to fetch TMDB data");

    const data = await response.json();
    return Response.json(data); // Return data as JSON
    //return data;
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
