const ResponseError = require("../error/error.response");

const errorMiddleWare = async (err, req, res, next) => {
    if(!err){
        next();
        return
    }

    // console.log(err)
    if(err instanceof ResponseError){
        return res.status(err.status).json({
            code : err.status,
            message : err.message
        })
    }

    console.log(err)
    return res.status(500).json({
        code : 500,
        message : err.message
    })
}

module.exports = {
    errorMiddleWare
}