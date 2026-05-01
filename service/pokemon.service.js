const ResponseError = require("../error/error.response")
const { pokemon } = require("../models")
const PokemonAPI = require("../api/pokemon.api")
const validate = require("../validation/validate")
const { updatePokemonValidation } = require("../validation/pokemon.validation")

const Create = async (id) => {

    const getPokemonAPI = await PokemonAPI.GetPokemonById(id)

    const getPokemon = await pokemon.findOne({
        where: {
            id
        }
    })

    if (getPokemon) {
        const update = await pokemon.update(
            getPokemonAPI,
            {
                where: {
                    id
                },
                returning: true
            }
        )

        const data = await pokemon.findOne({
            where: {
                id
            }
        })

        return data
    }

    const save = await pokemon.create(getPokemonAPI)

    return save
}

const Update = async (request) => {

    request = validate(updatePokemonValidation, request)

    let getPokemon = await pokemon.findOne({
        where: {
            id: request.id
        }
    })

    if (!getPokemon) throw new ResponseError(404, "data not found")

    await pokemon.update(
        request,
        {
            where: {
                id: request.id
            }
        }
    )

    getPokemon = await pokemon.findOne({
        where: {
            id: request.id
        }
    })

    return getPokemon
}

const FindAll = async (params) => {
    let { limit, offset } = params

    limit = limit ? parseInt(limit) : 10
    offset = offset ? parseInt(offset) : 0

    const getPokemon = await pokemon.findAll({
        limit,
        offset,
    })

    const totalPokemon = await pokemon.count()

    const meta = {
        limit,
        offset,
        total: totalPokemon
    }

    return { data: getPokemon, meta }
}

const FindById = async (id) => {
    const getPokemon = await pokemon.findOne({
        where: {
            id
        }
    })

    if (!getPokemon) {
        throw new ResponseError(404, "data not found")
    }

    return getPokemon
}

const Delete = async (id) => {
    const getPokemon = await pokemon.findOne({
        where: {
            id
        }
    })

    if (!getPokemon) throw ResponseError(404, "data not found")

    await pokemon.destroy({
        where: {
            id
        }
    })
}

const Test = async (id) => {
    const getPokemon = await PokemonAPI.GetPokemonById(id)
    return getPokemon
}

module.exports = {
    Create,
    Update,
    FindAll,
    FindById,
    Delete,
    Test
}