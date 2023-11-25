const getAllGames = require("../controller/getAllGames");

const handlerGetAllGames = async (req, res) => {
  try {
    const games = await getAllGames();
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al obtener los games desde el servidor");
  }
};

module.exports = handlerGetAllGames;
