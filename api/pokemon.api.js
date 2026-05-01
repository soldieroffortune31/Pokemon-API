const PokemonConfig = require("../config/pokemon.config")
const { HandleApiError } = require("../error/error.apicall")

const GetPokemonById = async (id) => {
    try {
        const res = await PokemonConfig.get(`/pokemon/${id}`)
        return ToPokemonReponse(res.data)
    } catch (error) {
        HandleApiError(error)
    }
}

const ToPokemonReponse = (data) => {
    return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        base_experience: data.base_experience,
        image: data?.sprites?.other?.home?.front_default || null
    }
} 

module.exports = {
    GetPokemonById
}