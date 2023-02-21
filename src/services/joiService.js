const Joi = require('joi')
const config = require('../config/config')

function validateUser(user) {
    const schema = Joi.object({
        _id: Joi.string().alphanum().min(3).max(config.VALIDATOR_USER_MAX_USERNAME).trim(),
        nombre: Joi.string().pattern(config.VALIDATOR_USER_NAME_REGEX),
        apellido: Joi.string().pattern(config.VALIDATOR_USER_NAME_REGEX),
        password: Joi.string().min(6).max(config.VALIDATOR_USER_MAX_PASSWORD),
        email: Joi.string().email()
    })

    return schema.validate(user)
}

function validateRequiredUser(user) {
    const schema = Joi.object({
        _id: Joi.string().alphanum().min(3).max(config.VALIDATOR_USER_MAX_USERNAME).trim().required(),
        nombre: Joi.string().pattern(config.VALIDATOR_USER_NAME_REGEX).required(),
        apellido: Joi.string().pattern(config.VALIDATOR_USER_NAME_REGEX).required(),
        password: Joi.string().min(6).max(config.VALIDATOR_USER_MAX_PASSWORD).required(),
        email: Joi.string().email().required()
    })

    return schema.validate(user)
}

function validatePost(post) {
    const schema = Joi.object({
        nombre: Joi.string().min(1).max(config.VALIDATOR_POST_NAME_MAX).trim().required(),
        cat: Joi.string().valid('senderismo', 'bicicleta', 'kayak').required(),
        km_distancia: Joi.number().greater(0).required(),
        dificultad: Joi.string().valid('facil', 'media', 'dificil').required(),
        min_duracion: Joi.number().greater(0).integer().required(),
        contenido: Joi.string().min(1).max(config.VALIDATOR_POST_CONTENT_MAX).required(),
        privacidad: Joi.string().valid('privado', 'amigos', 'publico').required(),
        usuario_id: Joi.string().alphanum().min(3).max(config.VALIDATOR_USER_MAX_USERNAME).trim().required(),
        coordenadas: Joi.any().optional()
    })

    return schema.validate(post)
}

function validateComment(comment) {
    const schema = Joi.object({
        contenido: Joi.string().min(1).max(config.VALIDATOR_COMMENT_CONTENT_MAX).required(),
        usuario_id: Joi.string().alphanum().min(3).max(config.VALIDATOR_USER_MAX_USERNAME).trim().required(),
        publicacion_id: Joi.string().required()
    })

    return schema.validate(comment)
}

module.exports = {
    user: (user) => validateUser(user),
    requiredUser: (user) => validateRequiredUser(user),
    post: (post) => validatePost(post),
    comment: (comment) => validateComment(comment)
} 