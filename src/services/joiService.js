const Joi = require('joi')
const namePattern = /^[a-zA-ZáéíóúñüÜÁÉÍÓÚÑ\s]+$/

function validateUser(user) {
    const schema = Joi.object({
        _id: Joi.string().alphanum().min(3).max(20).trim(),
        nombre: Joi.string().pattern(namePattern),
        apellido: Joi.string().pattern(namePattern),
        password: Joi.string().min(6).max(20),
        email: Joi.string().email()
    })

    return schema.validate(user)
}

function validateRequiredUser(user) {
    const schema = Joi.object({
        _id: Joi.string().alphanum().min(3).max(20).trim().required(),
        nombre: Joi.string().pattern(namePattern).required(),
        apellido: Joi.string().pattern(namePattern).required(),
        password: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().required()
    })

    return schema.validate(user)
}

function validatePost(post) {
    const schema = Joi.object({
        nombre: Joi.string().min(1).max(70).trim().required(),
        cat: Joi.string().valid('senderismo', 'bicicleta', 'kayak').required(),
        km_distancia: Joi.number().greater(0).required(),
        dificultad: Joi.string().valid('facil', 'media', 'dificil').required(),
        min_duracion: Joi.number().greater(0).integer().required(),
        contenido: Joi.string().min(1).max(500).required(),
        privacidad: Joi.string().valid('privado', 'amigos', 'publico').required(),
        usuario_id: Joi.string().alphanum().min(3).max(20).trim().required(),
        coordenadas: Joi.any().optional()
    })

    return schema.validate(post)
}

function validateComment(comment) {
    const schema = Joi.object({
        contenido: Joi.string().min(1).max(300).required(),
        usuario_id: Joi.string().alphanum().min(3).max(20).trim().required(),
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