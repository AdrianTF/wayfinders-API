const User = require('../usuarios/model')
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
        if (fs.existsSync(userFilePath) && data.foto != 'uploads/default.jpg') {
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
        if (fs.existsSync(userFilePath) && data.foto != 'uploads/default.jpg') {
            fs.unlinkSync(userFilePath)
        }

        const image = ({
            foto: 'uploads/default.jpg'
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

module.exports = {
    update: (req, res, next) => update(req, res, next),
    remove: (req, res, next) => remove(req, res, next)
}