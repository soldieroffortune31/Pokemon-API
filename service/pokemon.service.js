const ResponseError = require("../error/error.response")
const { sequelize, pokemon, abilities, pokemon_abilities } = require("../models")
const PokemonAPI = require("../api/pokemon.api")
const validate = require("../validation/validate")
const { updatePokemonValidation } = require("../validation/pokemon.validation")
const PokemonChace = require("../cache/pokemon.cache")

const Create = async (id) => {
    await sequelize.transaction(async (t) => {
    
        const key = `pokemon:${id}`
        const keyPokemonAPI = `pokemon:api:${id}`
        
        let getPokemonAPI = await PokemonChace.get(keyPokemonAPI)
        if (!getPokemonAPI) {
            getPokemonAPI = await PokemonAPI.GetPokemonById(id)
            await PokemonChace.set(keyPokemonAPI, getPokemonAPI, 120)
        }  
    
        let getPokemon = await PokemonChace.get(key)
        if (!getPokemon) {
            getPokemon = await pokemon.findOne({
                where: {
                    id
                },
                transaction: t
            })
        }

        let result
        if (getPokemon) {
            const update = await pokemon.update(
                getPokemonAPI,
                {
                    where: {
                        id
                    },
                    transaction: t
                }
            )
    
            result = await pokemon.findOne({
                where: {
                    id
                }
            })
        } else {
            result = await pokemon.create(getPokemonAPI, 
            {
                transaction: t
            })
        }

        await pokemon_abilities.destroy({
            where: {
                pokemon_id: result.pokemon_id
            },
            force: true,
            transaction: t
        })

        if (getPokemonAPI?.abilities?.length > 0) {
            for (let index = 0; index < getPokemonAPI.abilities.length; index++) {
                const element = getPokemonAPI.abilities[index];
                
                const [ability] = await abilities.findOrCreate({
                    where: {
                        name: element.ability.name
                    },
                    defaults: {
                        url: element.ability.url
                    },
                    transaction: t
                })

                await pokemon_abilities.create({
                    pokemon_id: result.pokemon_id,
                    ability_id: ability.ability_id,
                    is_hidden: element.is_hidden,
                    slot: element.slot
                }, {
                    transaction: t
                })
            }
        }
    
        await PokemonChace.del(key)
        await PokemonChace.set(key, result)
    
        return result
    })
}

const Update = async (request) => {

    request = validate(updatePokemonValidation, request)
    
    const key = `pokemon:${request.id}`
    let getPokemon = await PokemonChace.get(key)
    
    if (!getPokemon) {
        getPokemon = await pokemon.findOne({
            where: {
                id: request.id
            }
        })
    }

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

    await PokemonChace.del(key)
    await PokemonChace.set(key, getPokemon)

    return getPokemon
}

const FindAll = async (params) => {
    let { limit, offset } = params

    limit = limit ? parseInt(limit) : 10
    offset = offset ? parseInt(offset) : 0

    const key = `pokemon:limit:${limit}:offset:${offset}`

    let getPokemon = await PokemonChace.get(key)
    if (!getPokemon) {
        getPokemon = await pokemon.findAll({
            limit,
            offset,
        })
        await PokemonChace.set(key, getPokemon)
    }


    const totalPokemon = await pokemon.count()

    const meta = {
        limit,
        offset,
        total: totalPokemon
    }

    return { data: getPokemon, meta }
}

const FindById = async (id) => {
    const key = `pokemon:${id}`

    const pokemonCache = await PokemonChace.get(key)

    if (pokemonCache) return pokemonCache

    const getPokemon = await pokemon.findOne({
        where: {
            id
        },
        attributes: ["pokemon_id", "id", "height", "weight", "image"],
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
            }
        ]
    })

    if (!getPokemon) {
        throw new ResponseError(404, "data not found")
    }

    await PokemonChace.set(key, getPokemon)

    return getPokemon
}

const Delete = async (id) => {
    const key = `pokemon:${id}`

    let getPokemon = await PokemonChace.get(key)

    if (!getPokemon) {
        getPokemon = await pokemon.findOne({
            where: {
                id
            }
        })
    }

    if (!getPokemon) throw ResponseError(404, "data not found")

    await PokemonChace.del(key)

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