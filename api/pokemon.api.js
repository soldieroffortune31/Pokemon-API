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
        abilities: data.abilities,
        sprites: {
            back_default: data?.sprites?.back_default || null,
            back_female: data?.sprites?.back_female || null,
            back_shiny: data?.sprites?.back_shiny || null,
            back_shiny_female: data?.sprites?.back_shiny_female || null,
            front_default: data?.sprites?.front_default || null,
            front_female: data?.sprites?.front_female || null,
            front_shiny: data?.sprites?.front_shiny || null,
            front_shiny_female: data?.sprites?.front_shiny_female || null,
        }
    }
} 

module.exports = {
    GetPokemonById
}