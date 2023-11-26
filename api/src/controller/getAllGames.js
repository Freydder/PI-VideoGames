// const axios = require("axios");
// const { Videogame } = require("../db");
// const { API_PASSWORD } = process.env;

// const getAllGames = async () => {
//   try {
//     const response = await axios.get("https://api.rawg.io/api/games", {
//       params: {
//         key: API_PASSWORD,
//       },
//     });

//     const gamesFromAPI = response.data.results;

//     const gamesFromDB = await Videogame.findAll();

//     const games = [...gamesFromAPI, ...gamesFromDB];
//     return games;
//   } catch (error) {
//     throw new Error("Hubo un error al obtener los games");
//   }
// };

// module.exports = getAllGames;

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

    const gamesFromAPI = response.data.results.map(({ id, name, genres }) => ({
      id,
      name,
      genres,
    }));

    const gamesFromDB = await Videogame.findAll();

    const games = [...gamesFromAPI, ...gamesFromDB];
    return games;
  } catch (error) {
    throw new Error("Hubo un error al obtener los juegos");
  }
};

module.exports = getAllGames;
