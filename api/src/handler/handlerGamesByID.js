const getGamesByID = require("../controller/getGamesByID");

const handlerGamesByID = async (req, res) => {
  try {
    const { id } = req.params;
    const games = await getGamesByID(id);
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = handlerGamesByID;