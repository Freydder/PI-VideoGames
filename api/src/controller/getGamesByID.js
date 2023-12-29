const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { API_PASSWORD } = process.env;

const getGamesByID = async (id) => {
  try {
    if (isNaN(id)) {
      game = await Videogame.findByPk(id, {
        include: [
          {
            model: Genres,
            as: "Genres",
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });
      return game;
    } else {
      const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
        params: {
          key: API_PASSWORD,
        },
      });

      const gameFromAPI = response.data;
      const transformedGameFromAPI = {
        id: gameFromAPI.id,
        name: gameFromAPI.name,
        background_image: gameFromAPI.background_image,
        platforms: gameFromAPI.platforms.map((p) => p.platform.name).join(", "),
        description: gameFromAPI.description,
        released: gameFromAPI.released,
        rating: gameFromAPI.rating,
        genres: gameFromAPI.genres.map((g) => g.name).join(", "),
        createdinDB: false,
      };

      return transformedGameFromAPI;
    }
  } catch (error) {
    console.error("Error al obtener el detalle del juego:", error);
    throw new Error("Hubo un error al obtener el detalle del juego");
  }
};

module.exports = getGamesByID;

// const axios = require("axios");
// const { Videogame, Genres } = require("../db");
// const { API_PASSWORD } = process.env;

// const getGamesByID = async (id) => {
//   try {
//     let game;

//     if (isNaN(id)) {
//       game = await Videogame.findByPk(id, {
//         include: [
//           {
//             model: Genres,
//             as: "Genres",
//             attributes: ["name"],
//             through: { attributes: [] },
//           },
//         ],
//       });
//     } else {
//       const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
//         params: {
//           key: API_PASSWORD,
//         },
//       });

//       game = response.data;
//     }

//     const transformedGenres = game.Genres
//       ? game.Genres.map((genre) => genre.name)
//       : [];
//     const { Genres, ...gameGenres } = game.toJSON();

//     return {
//       ...gameGenres,
//       genres: transformedGenres.length > 0 ? transformedGenres.join(", ") : null,
//       createdinDB: !isNaN(id),
//     };
//   } catch (error) {
//     console.error("Error al obtener el detalle del juego:", error);
//     throw new Error("Hubo un error al obtener el detalle del juego");
//   }
// };

// module.exports = getGamesByID;
