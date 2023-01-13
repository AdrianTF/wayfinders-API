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

//No content. Create, Update or Delete not working.
//This response has no body.
//TODO Review this type of response.
function response204(response) {
    response.status(204).json({
        status: 'error',
        data: {
            id: '204',
            name: 'No content',
        },
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

// Unauthorized
function response401(response) {
    response.status(401).json({
      status: 'error',
      data: {
        id: '401',
        name: 'Unauthorized',
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
    response204: (response) => response204(response),
    response304: (response) => response304(response),
    response404: (response) => response404(response),
    response500: (response) => response500(response),
}
