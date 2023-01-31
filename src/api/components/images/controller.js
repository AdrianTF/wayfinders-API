const express = require('express')
const router = express.Router()
const multer = require('multer');
const User = require('../usuarios/model')
const send = require('../../../utils/response')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
router.put('/user/:id', upload.single('foto'), (req, res, next) => {
    console.log(req.file)
    const usuario = ({
        foto: req.file.path
    })

    User.findByIdAndUpdate(req.params.id, { $set: usuario }, { new: true }, (error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res)
        }
        send.response200(res, data)
    })
})

module.exports = router;