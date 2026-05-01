const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const PORT = process.env.DB_NAME || 3000;
const { connectRedis, client } = require("./config/redis.config");

const { errorMiddleWare } = require('./middleware/error.middleware');
const PokemonRouter = require("./router/pokemon.router")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());

app.use(PokemonRouter)

app.use(errorMiddleWare)


let server;
async function startServer() {
    await connectRedis()

    server = app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    });
}

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down...`);

  try {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log("HTTP server closed");
    }

    if (client.isOpen) {
      await client.quit(); // graceful close
      console.log("Redis disconnected");
    }

    process.exit(0);
  } catch (err) {
    console.error("Shutdown error:", err);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer()


