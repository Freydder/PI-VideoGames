const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { API_PASSWORD } = process.env;

const getAllGames = async (name) => {
  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: API_PASSWORD,
      },
    });

    const whereOptions = name ? { where: { name } } : {};

    const gamesFromDB = await Videogame.findAll({
      ...whereOptions,
      include: [
        {
          model: Genres,
          as: "Genres",
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    const transformedGames = gamesFromDB.map((game) => {
      const transformedGenres = game.Genres
        ? game.Genres.map((genre) => genre.name)
        : [];
      const { Genres, ...gameGenres } = game.toJSON();
      return {
        ...gameGenres,
        genres: transformedGenres.length > 0 ? transformedGenres[0] : null,
      };
    });

    const gamesFromAPI = response.data.results.map(
      ({
        id,
        name,
        background_image,
        platforms,
        description,
        released,
        rating,
        genres,
      }) => ({
        id,
        name,
        background_image,
        platforms: platforms.map((p) => p.platform.name).join(", "),
        description,
        released,
        rating,
        genres: genres.map((g) => g.name).join(", "),
        createdinDB: false,
      })
    );

    const games = [...gamesFromAPI, ...transformedGames];
    return games;
  } catch (error) {
    console.error("Error al obtener los juegos:", error);
    throw new Error("Hubo un error al obtener los juegos");
  }
};

module.exports = getAllGames;
