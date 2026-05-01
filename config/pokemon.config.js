// require("dotenv").config();
const axios = require('axios')

const PokemonConfig = axios.create({
    baseURL: process.env.POKEMON_API_URL
})

module.exports = PokemonConfig