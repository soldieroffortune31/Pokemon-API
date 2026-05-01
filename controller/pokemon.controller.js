const PokemonService = require("../service/pokemon.service")

const Create = async (req, res, next) => {
    try {
        
        const { id } = req.params

        const data = await PokemonService.Create(id)

        return res.status(200).json({
            code: 200,
            message: "Success create data pokemon",
            data
        })

    } catch (error) {
        next(error)
    }
}

const Update = async (req, res, next) => {
    try {

        const { id } = req.params
        const request = req.body
        request.id = id

        const data = await PokemonService.Update(request)

        return res.status(200).json({
            code: 200,
            message: "Success create update pokemon",
            data
        })

    } catch (error) {
        next(error)
    }
}

const GetAll = async (req, res, next) => {
    try {
        
        const data = await PokemonService.FindAll(req.query)

        return res.status(200).json({
            code: 200,
            message: "Success get all data pokemon",
            data: data.data,
            meta: data.meta
        })

    } catch (error) {
        next(error)
    }
}

const GetById = async (req, res, next) => {
    try {
        
        const { id } = req.params

        const data = await PokemonService.FindById(id)

        return res.status(200).json({
            code: 200,
            message: "Success get data pokemon",
            data
        })

    } catch (error) {
        next(error)
    }
}

const Delete = async (req, res, next) => {
    try {
        
        const { id } = req.params

        const data = await PokemonService.Delete(id)

        return res.status(200).json({
            code: 200,
            message: "Success delete data pokemon",
        })

    } catch (error) {
        next(error)
    }
}

const Test = async (req, res, next) => {
    try {
        
        const { id } = req.params

        const data = await PokemonService.Test(id)

        return res.status(200).json({
            code: 200,
            message: "Success delete data pokemon",
            data
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    Create,
    Update,
    GetAll,
    GetById,
    Delete,
    Test
}