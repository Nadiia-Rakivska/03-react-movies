import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number; // виправлено назву
}

export const fetchMovies = async (
  topic: string,
  page: number
): Promise<{ results: Movie[]; total_pages: number }> => {
  const response = await axios.get<MoviesHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: topic,
        page,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};
