class ImageNotAvailableError extends Error{
    code=406
    message='image not available'
}

class OutputNotSpecifiedError extends Error{
    code=412
    message='output not specified'
}

export {
    ImageNotAvailableError,
    OutputNotSpecifiedError
}