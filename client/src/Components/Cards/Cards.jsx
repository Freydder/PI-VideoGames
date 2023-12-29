import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";

export default function Cards({ currentGames, filteredGames }) {
  const gamesToDisplay = currentGames.length > 0 ? currentGames : filteredGames;

  return (
    <div className={style.container}>
      {gamesToDisplay?.map((game) => (
        <Card game={game} key={game.id} />
      ))}
    </div>
  );
}
