const redis = require('redis')

const redisClient = redis.createClient({
    url: process.env.DB_USER
})

redisClient.on("error", (err) => console.log("Redis Error", err));

async function connectRedis() {
  await redisClient.connect();
  console.log("Redis connected");
}

module.exports = {
    redisClient,
    connectRedis
}