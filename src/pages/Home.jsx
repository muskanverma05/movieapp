import MovieCard from "../components/MovieCard";
import { useState, useEffect, useRef } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const resultRef = useRef(null); // Focus for screen reader on result

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
      if (resultRef.current) resultRef.current.focus();
    }

    setSearchQuery("");
  };

  return (
    <div className="home">
      {/* Skip to Content Link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <form
        onSubmit={handleSearch}
        className="search-form"
        role="search"
        aria-label="Movie Search Form"
      >
        <label htmlFor="search-input" className="visually-hidden">
          Search for a movie
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-required="true"
        />
        <button
          type="submit"
          className="search-button"
          aria-label="Submit search"
        >
          Search
        </button>
      </form>
      {error && (
        <div className="error-message" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      {loading ? (
        <div className="loading" role="status" aria-live="polite">
          Loading...
        </div>
      ) : (
        <div
          className="movies-grid"
          id="main-content"
          ref={resultRef}
          tabIndex="-1"
          role="region"
          aria-label="Search results"
          aria-live="polite"
        >
          {movies.length === 0 ? (
            <p className="no-results" role="note">
              No movies found.
            </p>
          ) : (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
