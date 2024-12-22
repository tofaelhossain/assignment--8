export async function GET(__request, { params: { movieId } }) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY; // Store your API key securely
  const MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;
  const MOVIE_CREDITS_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`;

  try {
    // Fetch both details and credits in parallel
    const [detailsResponse, creditsResponse] = await Promise.all([
      fetch(MOVIE_DETAILS_URL),
      fetch(MOVIE_CREDITS_URL),
    ]);

    if (!detailsResponse.ok || !creditsResponse.ok)
      throw new Error("Failed to fetch movie data");

    // Parse JSON responses
    const details = await detailsResponse.json();
    const credits = await creditsResponse.json();

    //return { ...details, cast: credits.cast }; // Combine details with cast

    const combinedData = {
      ...details,
      cast: credits.cast, // Combine movie details with cast
    };

    return new Response(JSON.stringify(combinedData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching movie details and cast:", error.message);
    return null; // Return null or handle errors as needed
  }
}
