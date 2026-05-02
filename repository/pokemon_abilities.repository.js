const { pokemon_abilities } = require("../models")

const Save = async (payload, t = null) => {
    const result = await pokemon_abilities.create(
        payload,
        {
            transaction: t
        }
    ) 

    return result
}

const Delete = async (pokemon_id, t = null) => {
    await pokemon_abilities.destroy({
        where: {
            pokemon_id
        },
        transaction: t
    })
}

const DeleteForce = async (pokemon_id, t = null) => {
    await pokemon_abilities.destroy({
        where: {
            pokemon_id
        },
        force: true,
        transaction: t
    })
}

module.exports = {
    Save,
    Delete,
    DeleteForce
}