import React, { useState, useEffect } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import axios from "axios";

const WatchLater = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchWatchLater = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/titles/watchlater/");
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to load watch later movies:", error);
      }
    };

    fetchWatchLater();
  }, []);

  return (
    <div className="watch-later">
      <h1>Movies you like</h1>
      <div className="movies-grid">
        {movies.map((movie) => <MovieCard key={movie.imdbId} movie={movie} />)}
      </div>
    </div>
  );
};

export default WatchLater;
