const ResponseError = require("../error/error.response");

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly : false,
        allowUnkown : false
    })

    if(result.error){
        throw new ResponseError(400, result.error.message)
    }
    
    return result.value
    
}


module.exports = validate