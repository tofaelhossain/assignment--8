// app/api/movie/search/route.js

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return new Response(
      JSON.stringify({ error: "Query parameter is required." }),
      { status: 400 }
    );
  }

  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const TMDB_URL = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    query
  )}`;
  //console.log("api ==", TMDB_URL);

  try {
    const response = await fetch(TMDB_URL);
    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.status_message }), {
        status: response.status,
      });
    }

    return Response.json(data); // Return data as JSON

    //return new Response(JSON.stringify({ movies: data.results }), {
    //  status: 200,
    //});
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
