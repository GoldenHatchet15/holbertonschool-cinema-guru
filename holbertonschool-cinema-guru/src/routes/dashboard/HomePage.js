import React, { useState, useEffect, useCallback } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import Filter from "../../components/movies/Filter";
import Button from "../../components/general/Button";
import axios from "axios";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  // ✅ Wrap `loadMovies` in useCallback to prevent unnecessary re-renders
  const loadMovies = useCallback(async (pageNumber) => { 
    try {
      const response = await axios.get("http://localhost:8000/api/titles/advancedsearch", {
        params: { minYear, maxYear, genres, title, sort, page: pageNumber },
      });

      setMovies((prevMovies) => [...prevMovies, ...response.data]); 
    } catch (error) {
      console.error("Failed to load movies:", error);
    }
  }, [minYear, maxYear, genres, title, sort]); // ✅ Dependencies

  // ✅ useEffect will now only run when dependencies change
  useEffect(() => {
    setMovies([]); 
    loadMovies(1);
  }, [minYear, maxYear, genres, title, sort, loadMovies]); 

  return (
    <div className="homepage">
      <Filter
        minYear={minYear} setMinYear={setMinYear}
        maxYear={maxYear} setMaxYear={setMaxYear}
        sort={sort} setSort={setSort}
        genres={genres} setGenres={setGenres}
        title={title} setTitle={setTitle}
      />

      <div className="movies-grid">
        {movies.map((movie) => <MovieCard key={movie.imdbId} movie={movie} />)}
      </div>

      <Button text="Load More.." onClick={() => {
        setPage(page + 1);
        loadMovies(page + 1);
      }} />
    </div>
  );
};

export default HomePage;
