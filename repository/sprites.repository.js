const { sprites } = require("../models")

const Upsert = async (payload, t =  null) => {
    await sprites.upsert(payload, {
        transaction: t
    })
}

const Delete = async (pokemon_id, t = null) => {
    await sprites.destroy({
        where: {
            pokemon_id
        },
        transaction: t
    })
}

module.exports = {
    Upsert,
    Delete
}