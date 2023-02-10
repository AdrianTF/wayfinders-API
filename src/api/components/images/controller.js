const User = require('../usuarios/model')
const Posts = require('../publicaciones/model')
const send = require('../../../utils/response')
const fs = require('fs')
const log = require('../../../utils/log')


function update(req, res, next) {
    if (!req.isFileValid) {
        log.write('Uploading invalid file type.')
        return send.response500(res)
    }

    User.findById(req.params.id, (error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }

        const userFilePath = './' + data.foto
        if (fs.existsSync(userFilePath) && data.foto != 'uploads/users/default.jpg') {
            fs.unlinkSync(userFilePath)
        }

        const image = ({
            foto: req.file.path
        })

        User.findByIdAndUpdate(req.params.id, { $set: image }, { new: true }, (error, user) => {
            if (error) {
                log.write(error)
                return send.response500(res)
            }
            if (!user) {
                return send.response404(res)
            }
            send.response200(res, user)
        })
    })
}

function remove(req, res, next) {

    User.findById(req.body.user, (error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }

        const userFilePath = './' + data.foto
        if (fs.existsSync(userFilePath) && data.foto != 'uploads/users/default.jpg') {
            fs.unlinkSync(userFilePath)
        }

        const image = ({
            foto: 'uploads/users/default.jpg'
        })

        User.findByIdAndUpdate(req.body.user, { $set: image }, { new: true }, (error, user) => {
            if (error) {
                log.write(error)
                return send.response500(res)
            }
            if (!user) {
                return send.response404(res)
            }
            send.response200(res, user)
        })
    })
}

function multi(req, res, next) {
    if (!req.isFileValid && req.files) {
        log.write('Uploading invalid file type.')
        return send.response500(res)
    }

    Posts.findById(req.params.id, (error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }
        data.fotos.forEach(element => {
            const postFilePath = './' + element
            if (fs.existsSync(postFilePath)) {
                fs.unlinkSync(postFilePath)
            }
        })

        let paths = []

        if (req.files) {
            req.files.forEach(element => {
                paths.push(element.path)
            });
        }

        const images = ({
            fotos: paths
        })

        Posts.findByIdAndUpdate(req.params.id, { $set: images }, { new: true }, (error, user) => {
            if (error) {
                log.write(error)
                return send.response500(res)
            }
            if (!user) {
                return send.response404(res)
            }
            send.response200(res, user)
        })
    })
}

module.exports = {
    update: (req, res, next) => update(req, res, next),
    remove: (req, res, next) => remove(req, res, next),
    multi: (req, res, next) => multi(req, res, next)
}