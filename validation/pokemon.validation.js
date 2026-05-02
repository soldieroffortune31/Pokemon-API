const Joi = require("joi")

const updatePokemonValidation = Joi.object({
    id: Joi.number().min(1).required(),
    name : Joi.string().max(225).required(),
    height: Joi.number().min(1).required(),
    weight: Joi.number().min(1).required(),
    base_experience: Joi.number().min(1).required()
})

module.exports = {
    updatePokemonValidation
}