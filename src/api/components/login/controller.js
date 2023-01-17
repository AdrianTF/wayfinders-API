const User = require('../usuarios/model')
const send = require('../../../utils/response')


function login(req, res) {
    console.log('Yet to be implemented')
}

function register(req, res) {
    console.log('Yet to be implemented')
}


module.exports = {
    login: (req, res) => login(req, res),
    register: (req, res) => register(req, res)
}