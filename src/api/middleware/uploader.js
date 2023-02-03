const send = require('../../utils/response')
const upload = require('../../services/multerServices')

module.exports = (req, res, next) => {
    upload(req, res,
        (error) => {
            if (!error) {
                return next();
            }
            return send.response500(res);
        }
    );
};