const { Router } = require("express");
const handlerGetAllGames = require("../handler/handlerGetAllGames");
const handlerGamesByID = require("../handler/handlerGamesByID");
const handlerGamesByName = require("../handler/handlerGamesByName");

const router = Router();

router.get("/videogames", handlerGetAllGames);
router.get("/videogames/name", handlerGamesByName);
router.get("/videogames/:id", handlerGamesByID);

module.exports = router;
