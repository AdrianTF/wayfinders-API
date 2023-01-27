const send = require('../../utils/response')
const validation = require('../../services/joiService')
const log = require('../../utils/log')

const user = () => (req, res, next) => {
    const { error } = validation.user(req.body)
    if (error) {
        log.write(error)
        return send.response404(res)
    }
    next()
}

const post = () => (req, res, next) => {
    const { error } = validation.post(req.body)
    if (error) {
        log.write(error)
        return send.response404(res)
    }
    next()
}

const comment = () => (req, res, next) => {
    const { error } = validation.comment(req.body)
    if (error) {
        log.write(error)
        return send.response404(res)
    }
    next()
}

module.exports = {
    user,
    post,
    comment
}