import React, { useState } from "react";
import "./movies.css";

const Tag = ({ genre, genres, setGenres }) => {
    const isSelected = genres.includes(genre); // Check if it's already selected

    const handleTag = () => {
        if (isSelected) {
            setGenres(genres.filter((g) => g !== genre));
        } else {
            setGenres([...genres, genre]);
        }
    };

    return (
        <li 
            className={`tag ${isSelected ? "selected" : ""}`} 
            onClick={handleTag}
        >
            {genre}
        </li>
    );
};

export default Tag;
