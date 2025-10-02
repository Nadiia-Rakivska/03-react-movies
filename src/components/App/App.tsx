import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import Paginate from "../Paginate/Paginate";

export default function App() {
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [movie, setMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", topic, page],
    queryFn: () => fetchMovies(topic, page),
    enabled: topic.trim().length > 0,
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);
  const handleSubmit = (topic: string) => {
    setTopic(topic);
    setPage(1);
  };

  const handleClick = (movie: Movie) => {
    setMovie(movie);
  };

  const handleClose = () => {
    setMovie(null);
  };

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      {isSuccess && data.total_pages > 1 && (
        <Paginate
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.results.length > 0 && (
        <MovieGrid onSelect={handleClick} movies={data.results} />
      )}

      {movie && <MovieModal movie={movie} onClose={handleClose} />}

      <Toaster />
    </div>
  );
}
