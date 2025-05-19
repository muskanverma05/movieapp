import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <article className="movie-card" aria-labelledby={`movie-title-${movie.id}`}>
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`Poster of ${movie.title}`}
          loading="lazy"
          width="300"
          height="450"
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
            aria-pressed={favorite}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3 id={`movie-title-${movie.id}`}>{movie.title}</h3>
        <p>
          <span className="visually-hidden">Release year:</span>
          {movie.release_date?.split("-")[0]}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;

{
  /* <button
  onClick={() => addToFavorites(movie)}
  aria-pressed={isFavorite(movie.id)}
  aria-label={
    isFavorite(movie.id)
      ? `Remove ${movie.title} from favorites`
      : `Add ${movie.title} to favorites`
  }
>
  {isFavorite(movie.id) ? "💔 Unfavorite" : "❤️ Favorite"}
</button> */
}
