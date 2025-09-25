import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface Props {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}
export default function MovieGrid({ onSelect, movies }: Props) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        return (
          <li key={movie.id} onClick={() => onSelect(movie)}>
            <div className={css.card}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
              <h2 className={css.title}>Movie title</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
