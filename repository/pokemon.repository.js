const { pokemon, pokemon_abilities, abilities, sprites } = require("../models")

const Save = async (payload, t = null) => {
    const result = await pokemon.create(
        payload,
        {
            transaction: t
        }
    )

    return result
}

const Update = async (payload, id, t = null) => {
    await pokemon.update(
        payload,
        {
            where: {
                id
            },
            transaction: t
        }
    )
}

const FindById = async (id, t = null) => {
    const result = await pokemon.findOne({
        where: {
            id
        },
        attributes: ["pokemon_id", "id", "name", "height", "weight", "base_experience"],
        include: [
            {
                model: pokemon_abilities,
                as: "abilities",
                attributes: ["is_hidden", "slot"],
                include: [
                    {
                        model: abilities,
                        as: "ability",
                        attributes: ["name", "url"]
                    }
                ]
            },
            {
                model: sprites,
                as: "sprites"
            }
        ],
        transaction: t
    })

    return result
}

const FindAll = async (filter, limit, offset, t = null) => {    
    const result = await pokemon.findAll({
        where: filter,
        limit,
        offset,
        transaction: t
    })

    return result
}

const Count = async (filter, t = null) => {
     const count = await pokemon.count({
        where: filter,
        transaction: t
    })

    return count
}

const Delete = async (id, t = null) => {
    await pokemon.destroy({
        where: {
            id
        },
        transaction: t
    })
}

module.exports = {
    Save,
    Update,
    FindById,
    FindAll,
    Count,
    Delete
}