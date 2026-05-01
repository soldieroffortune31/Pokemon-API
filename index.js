const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const PORT = process.env.DB_NAME || 3000;

const { errorMiddleWare } = require('./middleware/error.middleware');
const PokemonRouter = require("./router/pokemon.router")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());

app.use(PokemonRouter)

app.use(errorMiddleWare)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});