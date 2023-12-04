const { Videogame } = require("../db");

const createGames = async (
  name,
  background_image,
  platforms,
  description,
  released,
  rating,
  genres,
  createinDB
) => {
  const options = {
    where: { name },
    defaults: {
      background_image,
      platforms,
      description,
      released,
      rating,
      genres,
      createinDB,
    },
  };

  const [game, created] = await Videogame.findOrCreate(options);

  return game;
};

module.exports = createGames;
