const { Videogame, Genres } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { API_PASSWORD } = process.env;

const getGamesByName = async (name) => {
  if (name) {
    const gameDB = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}$%`,
        },
      },
      include: Genres,
    });
    const gameApi = await axios.get(
      `https://api.rawg.io/api/games?search=${name}`,
      {
        params: {
          key: API_PASSWORD,
        },
      }
    );

    const gamesFromApi = gameApi.data.results.map((game) => ({
      id: game.id,
      name: game.name,
      released: game.released,
      background_image: game.background_image,
      genres: game.genres.map((genre) => genre.name).join(", "),
    }));

    const games = [...gameDB, ...gamesFromApi];

    return games;
  }
};

module.exports = getGamesByName;
