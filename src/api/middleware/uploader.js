const send = require('../../utils/response')
const upload = require('../../services/multerServices')
const log = require('../../utils/log')

module.exports = {
    single: (req, res, next) => {
        upload.single(req, res,
            (error) => {
                if (!error) {
                    return next();
                }
                log.write(error)
                return send.response500(res);
            }
        );
    },
    multi: (req, res, next) => {
        upload.multi(req, res,
            (error) => {
                if (!error) {
                    return next();
                }
                log.write(error)
                return send.response500(res);
            }
        );
    }
}