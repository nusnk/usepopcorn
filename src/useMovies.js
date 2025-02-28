import { useEffect, useState } from "react";
const KEY = "526086fd";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(function() {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }
        const data = await res.json();

        if (data.Response === "False") {
          throw Error("Movie not found");
        }
        setMovies(data.Search);
        setError("");
      } catch (error) {
        if(error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
    return function () {
      controller.abort();
    }
  },[query]);

  return { movies, isLoading, error }
}