const { Videogame } = require("../db");

const createGames = async (
  name,
  description,
  plataformas,
  image,
  date,
  rating,
  genres,
  createinDB
) => {
  const options = {
    where: { name },
    defaults: {
      description,
      plataformas,
      image,
      date,
      rating,
      genres,
      createinDB,
    },
  };

  const [game, created] = await Videogame.findOrCreate(options);

  return game;
};

module.exports = createGames;
