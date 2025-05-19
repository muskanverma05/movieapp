import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import { ThemeProvider } from "./contexts/ThemeContext"; // import ThemeProvider

function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <div>
          <NavBar />
          <main id="main-content" className="main-content">
            {/* Added id for skip link target */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
