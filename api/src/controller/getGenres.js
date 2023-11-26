const axios = require("axios");
const { Genres } = require("../db");
const { API_PASSWORD } = process.env;

const getGenres = async () => {
  try {
    const response = await axios.get("https://api.rawg.io/api/genres", {
      params: {
        key: API_PASSWORD,
      },
    });

    const genresFromAPI = response.data.results;

    for (const genre of genresFromAPI) {
      await Genres.findOrCreate({
        where: { name: genre.name },
        defaults: {
          name: genre.name,
        },
      });
    }

    return genresFromAPI;
  } catch (insertError) {
    console.error(
      "Error al insertar género en la base de datos:",
      insertError.message
    );
  }
};

module.exports = getGenres;
