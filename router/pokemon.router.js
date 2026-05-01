const express = require('express')
const router = express.Router()

const PokemonController = require("../controller/pokemon.controller")

router.post("/pokemon/sync/:id", PokemonController.Create)
router.put("/pokemon/:id", PokemonController.Update)
router.get("/pokemon", PokemonController.GetAll)
router.get("/pokemon/:id", PokemonController.GetById)
router.delete("/pokemon/:id", PokemonController.Delete)
router.get("/test/:id", PokemonController.Test)

module.exports = router
