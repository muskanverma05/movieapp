import { createContext, useState, useContext, useEffect } from "react";

// Context for storing and accessing favorite movies
const MovieContext = createContext();

// Custom hook for cleaner access
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on first render
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs));
      } catch (err) {
        console.warn("Failed to parse favorites from localStorage:", err);
        localStorage.removeItem("favorites"); // reset corrupted data
      }
    }
  }, []);

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a movie to favorites (keyboard triggers should be handled in buttons)
  const addToFavorites = (movie) => {
    if (!isFavorite(movie.id)) {
      setFavorites((prev) => [...prev, movie]);
      announce(`${movie.title} added to favorites`);
    }
  };

  // Remove a movie from favorites
  const removeFromFavorites = (movieId) => {
    const movie = favorites.find((m) => m.id === movieId);
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
    if (movie) announce(`${movie.title} removed from favorites`);
  };

  // Check if a movie is already in favorites
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  // 📣 Optional: live region announcer for screen readers
  const announce = (message) => {
    const el = document.getElementById("a11y-live-region");
    if (el) {
      el.textContent = "";
      setTimeout(() => {
        el.textContent = message;
      }, 100);
    }
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <>
      <MovieContext.Provider value={value}>{children}</MovieContext.Provider>

      {/* Accessible live region for screen reader announcements */}
      <div
        id="a11y-live-region"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      />
    </>
  );
};
