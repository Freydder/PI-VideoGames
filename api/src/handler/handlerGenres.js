const getGenres = require("../controller/getGenres");
const { Genres } = require("../db");

const handlerGenres = async (req, res) => {
  try {
    const genresCount = await Genres.count();
    let genres;

    if (genresCount === 0) {
      genres = await getGenres();
    } else {
      genres = await Genres.findAll();
    }

    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handlerGenres;