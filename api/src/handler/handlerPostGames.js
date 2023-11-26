const createGames = require("../controller/postGames");

const handlerCreateGames = async (req, res) => {
  const { name, description, plataformas, image, date, rating, genres } =
    req.body;
  try {
    if (
      !name ||
      !description ||
      !plataformas ||
      !image ||
      !date ||
      !rating ||
      !genres ||
      !genres.length
    ) {
      return res.status(400).json({ status: "Se necesita información" });
    }

    const newGame = await createGames(
      name,
      description,
      plataformas,
      image,
      date,
      rating,
      genres
    );
    res.status(200).json(newGame);
    return newGame;
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = handlerCreateGames;