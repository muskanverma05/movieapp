import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useEffect, useRef } from "react";

function Favorites() {
  const { favorites } = useMovieContext();
  const headingRef = useRef();

  // Visually-impaired / screen-reader focus
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  const hasFavorites = favorites && favorites.length > 0;

  return (
    <main className="favorites" role="main" aria-label="Favorites Page">
      {hasFavorites ? (
        <>
          <h2 ref={headingRef} tabIndex="-1" id="favorites-heading">
            Your Favorite Movies
          </h2>

          <section
            className="movies-grid"
            role="list"
            aria-label="List of favorite movies"
          >
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} role="listitem" />
            ))}
          </section>
        </>
      ) : (
        <section
          className="favorites-empty"
          role="region"
          aria-labelledby="no-favorites-heading"
          aria-live="polite"
        >
          <h2 id="no-favorites-heading" ref={headingRef} tabIndex="-1">
            No Favorite Movies Yet
          </h2>
          <p tabIndex="0" lang="en">
            Start adding movies to your favorites and they will appear here.
          </p>
        </section>
      )}
    </main>
  );
}

export default Favorites;
