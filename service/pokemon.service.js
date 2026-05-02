const ResponseError = require("../error/error.response")
const { sequelize, pokemon, abilities, pokemon_abilities, sprites } = require("../models")
const PokemonAPI = require("../api/pokemon.api")
const validate = require("../validation/validate")
const { updatePokemonValidation } = require("../validation/pokemon.validation")
const PokemonChace = require("../cache/pokemon.cache")
const AbilityRepository = require("../repository/abilities.repository")
const PokemonRepository = require("../repository/pokemon.repository")
const PokemonAbilitiesRepository = require("../repository/pokemon_abilities.repository")
const SpritesRepository = require("../repository/sprites.repository")

const Create = async (id) => {
    return await sequelize.transaction(async (t) => {
    
        const key = `pokemon:${id}`
        const keyPokemonAPI = `pokemon:api:${id}`
        
        let getPokemonAPI = await PokemonChace.get(keyPokemonAPI)
        if (!getPokemonAPI) {
            getPokemonAPI = await PokemonAPI.GetPokemonById(id)
            await PokemonChace.set(keyPokemonAPI, getPokemonAPI, 120)
        }  
    
        let getPokemon = await PokemonChace.get(key)
        if (!getPokemon) {
            getPokemon = await PokemonRepository.FindById(id, t)
        }

        let pokemon_id
        let result
        if (getPokemon) {
            await PokemonRepository.Update(getPokemonAPI, id, t)
            pokemon_id = getPokemon.pokemon_id
        } else {
            result = await PokemonRepository.Save(getPokemonAPI, t) 
            pokemon_id = result.pokemon_id
        }

        await PokemonAbilitiesRepository.DeleteForce(pokemon_id)

        if (getPokemonAPI?.abilities?.length > 0) {
            for (let index = 0; index < getPokemonAPI.abilities.length; index++) {
                const element = getPokemonAPI.abilities[index];
                
                const ability = await AbilityRepository.FindOrCreate(element.ability, t)

                await PokemonAbilitiesRepository.Save({
                    pokemon_id: pokemon_id,
                    ability_id: ability.ability_id,
                    is_hidden: element.is_hidden,
                    slot: element.slot
                }, t)
            }
        }

        const spritesPayload = getPokemonAPI.sprites
        spritesPayload.pokemon_id = pokemon_id

        await SpritesRepository.Upsert(spritesPayload, t)

        result = await PokemonRepository.FindById(id, t)
        
        await PokemonChace.del(key)
        await PokemonChace.set(key, result)
    
        return result
    })
}

const Update = async (request) => {

    request = validate(updatePokemonValidation, request)
    
    const id = request.id
    const key = `pokemon:${id}`
    let getPokemon = await PokemonChace.get(key)
    
    if (!getPokemon) {
        getPokemon = await PokemonRepository.FindById(id)
    }

    if (!getPokemon) throw new ResponseError(404, "data not found")

    await PokemonRepository.Update(request, id)

    getPokemon = await PokemonRepository.FindById(id)

    await PokemonChace.del(key)
    await PokemonChace.set(key, getPokemon)

    return getPokemon
}

const FindAll = async (params) => {
    let { limit, offset } = params

    limit = limit ? parseInt(limit) : 10
    offset = offset ? parseInt(offset) : 0

    const key = `pokemon:limit:${limit}:offset:${offset}`
    const filter = {}

    let getPokemon = await PokemonChace.get(key)
    if (!getPokemon) {
        getPokemon = await PokemonRepository.FindAll(filter, limit, offset)
        await PokemonChace.set(key, getPokemon)
    }

    const totalPokemon = await PokemonRepository.Count(filter)

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

    const getPokemon = await PokemonRepository.FindById(id)

    if (!getPokemon) {
        throw new ResponseError(404, "data not found")
    }

    await PokemonChace.set(key, getPokemon)

    return getPokemon
}

const Delete = async (id) => {
    await sequelize.transaction(async (t) => {
        const key = `pokemon:${id}`
    
        let getPokemon = await PokemonChace.get(key)
    
        if (!getPokemon) {
            getPokemon = await PokemonRepository.FindById(id)
        }
    
        if (!getPokemon) throw ResponseError(404, "data not found")
    
        const pokemon_id = getPokemon.pokemon_id
        await PokemonChace.del(key)
    
        await PokemonRepository.Delete(id)
        await PokemonAbilitiesRepository.Delete(pokemon_id)
        await SpritesRepository.Delete(pokemon_id)
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