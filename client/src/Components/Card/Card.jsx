import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card({ game }) {
  const { id, background_image, name, genres } = game;

  return (
    <div className={style.div}>
      <Link to={`/detail/${id}`}>
        {background_image && (
          <img src={background_image} alt="" className={style.img} />
        )}
        <h2>{name}</h2>
      </Link>
      <div className={style.genres}>
        <h3>Géneros:</h3>
        <ul>
          {genres &&
            Array.isArray(genres) &&
            genres.length > 0 &&
            genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
