import React from "react";
import { Link } from "react-router";
const Cards = ({ movie }) => {
  return (
    <div className="card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        className="cardImage"
      />
      <div className="cardDetails">
        <span>{movie.original_title}</span>
      </div>
    </div>
  );
};

export default Cards;
