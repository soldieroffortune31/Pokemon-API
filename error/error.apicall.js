const ResponseError = require("./error.response")

const HandleApiError = (error) => {
    const statusCode = error?.response?.status || 500
    const errorMessage = error?.response?.statusText || "Failed Calling API"

    throw new ResponseError(statusCode, errorMessage)
}

module.exports = {
    HandleApiError
}