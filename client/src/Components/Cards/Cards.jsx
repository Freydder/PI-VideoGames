import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";
export default function Cards({ currentGames }) {
  return (
    <div className={style.div}>
      {currentGames?.map((game) => (
        <Card game={game} key={game.id} />
      ))}
    </div>
  );
}
