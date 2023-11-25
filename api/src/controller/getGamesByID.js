const getAllGames = require("./getAllGames");

const getGamesByID = async (id) => {
  try {
    const games = await getAllGames();
    const game = games.find((e) => e.id == id);
    if (!game) {
      throw new Error("Game no encontrado");
    }
    return game;
  } catch (error) {
    throw new Error("Hubo un error al obtener el detalle del game");
  }
};

module.exports = getGamesByID;
