//Ok
function response200(response, data) {
    response.status(200).json({
        status: 'ok',
        data: data,
    });
}

//Created
function response201(response, data) {
    response.status(201).json({
        status: 'ok',
        data: data,
    });
}

// Not Modified
function response304(response) {
    response.status(304).json({
        status: 'error',
        data: {
            id: '304',
            name: 'Not modified',
        },
    });
}

// Not Found
function response404(response) {
    response.status(404).json({
        status: 'error',
        data: {
            id: '404',
            name: 'Not found',
        },
    });
}

//Server error
function response500(response) {
    response.status(500).json({
        status: 'error',
        data: {
            id: '500',
            name: 'Internal Server Error',
        },
    });
}

module.exports = {
    response200: (response, data) => response200(response, data),
    response201: (response, data) => response201(response, data),
    response304: (response) => response304(response),
    response404: (response) => response404(response),
    response500: (response) => response500(response),
}
