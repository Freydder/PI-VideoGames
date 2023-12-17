const axios = require("axios");
const { Videogame } = require("../db");
const { API_PASSWORD } = process.env;

const getAllGames = async () => {
  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: API_PASSWORD,
      },
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
        platforms,
        description,
        released,
        rating,
        genres,
        createdinDB: false,
      })
    );

    const gamesFromDB = await Videogame.findAll();

    const games = [...gamesFromAPI, ...gamesFromDB];
    return games;
  } catch (error) {
    throw new Error("Hubo un error al obtener los juegos");
  }
};

module.exports = getAllGames;
