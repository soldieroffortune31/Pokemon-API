const { abilities } = require("../models")

const FindOrCreate = async (payload, t = null) => {
    const [result] = await abilities.findOrCreate({
        where: {
            name: payload.name
        },
        defaults: {
            url: payload.url
        },
        transaction: t
    })

    return result
}

module.exports = {
    FindOrCreate
}