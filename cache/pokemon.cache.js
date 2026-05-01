const { redisClient } = require("../config/redis.config")

const get = async (key) => {
    const data = await redisClient.get(key)
    
    if (!data) return null

    return JSON.parse(data)
}

const set = async (key, value, ttl = 60) => {
    await redisClient.setEx(
        key,
        ttl,
        JSON.stringify(value)
    )
}

const del = async (key) => {
    await redisClient.del(key)
}

module.exports = {
    get,
    set,
    del
}