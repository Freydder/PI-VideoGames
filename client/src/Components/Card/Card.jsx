import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card({ game }) {
  const { id, background_image, name, genres, rating } = game;

  return (
    <div className={style.div}>
      <Link to={`/detail/${id}`}>
        {background_image && (
          <img src={background_image} alt="" className={style.img} />
        )}
      </Link>
      <h2>{name}</h2>
      <h3>Géneros:</h3>
      <h4>{genres}</h4>
      <h4>{rating}</h4>
    </div>
  );
}
