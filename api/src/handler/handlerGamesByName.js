const getGamesByName = require("../controller/getGamesByName");

const handlerGamesByName = async (req, res) => {
  const name = req.query.name;

  try {
    const gameByName = await getGamesByName(name);
    res.status(200).json(gameByName);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = handlerGamesByName;