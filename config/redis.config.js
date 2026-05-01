const redis = require('redis')

const client = redis.createClient({
    url: process.env.DB_USER
})

client.on("error", (err) => console.log("Redis Error", err));

async function connectRedis() {
  await client.connect();
  console.log("Redis connected");
}

module.exports = {
    client,
    connectRedis
}