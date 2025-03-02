import React, { useState, useEffect } from "react";
import "./movies.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const favoriteRes = await axios.get("http://localhost:8000/api/titles/favorite/");
        const watchLaterRes = await axios.get("http://localhost:8000/api/titles/watchlater/");
        setIsFavorite(favoriteRes.data.includes(movie.imdbId));
        setIsWatchLater(watchLaterRes.data.includes(movie.imdbId));
      } catch (error) {
        console.error("Failed to fetch user lists:", error);
      }
    };
    fetchUserLists();
  }, [movie.imdbId]);

  const handleClick = async (type) => {
    try {
      if (type === "favorite") {
        if (isFavorite) {
          await axios.delete(`http://localhost:8000/api/titles/favorite/${movie.imdbId}`);
          setIsFavorite(false);
        } else {
          await axios.post(`http://localhost:8000/api/titles/favorite/${movie.imdbId}`);
          setIsFavorite(true);
        }
      } else if (type === "watchlater") {
        if (isWatchLater) {
          await axios.delete(`http://localhost:8000/api/titles/watchlater/${movie.imdbId}`);
          setIsWatchLater(false);
        } else {
          await axios.post(`http://localhost:8000/api/titles/watchlater/${movie.imdbId}`);
          setIsWatchLater(true);
        }
      }
    } catch (error) {
      console.error(`Failed to update ${type}:`, error);
    }
  };

  return (
    <li className="movie-card">
      <div className="movie-actions">
        <FontAwesomeIcon
          icon={faStar}
          className={isFavorite ? "favorited" : ""}
          onClick={() => handleClick("favorite")}
        />
        <FontAwesomeIcon
          icon={faClock}
          className={isWatchLater ? "watch-later" : ""}
          onClick={() => handleClick("watchlater")}
        />
      </div>
      <h3>{movie.title}</h3>
      <p>{movie.synopsis}</p>
      <ul className="genres">
        {movie.genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </li>
  );
};

export default MovieCard;
