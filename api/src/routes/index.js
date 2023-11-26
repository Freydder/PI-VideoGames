const { Router } = require("express");
const handlerGetAllGames = require("../handler/handlerGetAllGames");
const handlerGamesByID = require("../handler/handlerGamesByID");
const handlerGamesByName = require("../handler/handlerGamesByName");
const handlerCreateGames = require("../handler/handlerPostGames");
const handlerGenres = require("../handler/handlerGenres");

const router = Router();

router.get("/videogames", handlerGetAllGames);
router.get("/videogames/name", handlerGamesByName);
router.get("/videogames/:id", handlerGamesByID);
router.get("/genres", handlerGenres);
router.post("/videogames", handlerCreateGames);

module.exports = router;
