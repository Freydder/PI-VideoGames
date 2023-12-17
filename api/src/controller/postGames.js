const { Videogame, Genres } = require("../db");

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
  try {
    if (
      !name ||
      !background_image ||
      !platforms ||
      !description ||
      !released ||
      !rating ||
      !genres
    ) {
      throw Error("Falta información del Videogame");
    }

    const newGame = await Videogame.create({
      name,
      background_image,
      platforms,
      description,
      released,
      rating,
      createdinDB: createinDB,
    });

    // Buscar o crear géneros y asociarlos al videojuego
    const associatedGenres = [];

    for (const genreName of genres) {
      const [genre, created] = await Genres.findOrCreate({
        where: { name: genreName }
      });
      associatedGenres.push(genre);
    }

    await newGame.setGenres(associatedGenres);

    return newGame;
  } catch (error) {
    console.error("Error al crear el videojuego:", error);
    throw error;
  }
};

module.exports = createGames;

