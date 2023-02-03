const express = require('express')
const router = express.Router()
const multer = require('multer');
const User = require('../usuarios/model')
const send = require('../../../utils/response')

const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //Crear carpeta uploads si no existe
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        //console.log(new Date().toISOString().replace(/[:.]/g, '-'))
        cb(null, new Date().toISOString().replace(/[:.]/g, '-') + file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg' || file.mimetype === 'image/jpg') {
        req.isFileValid = true
        cb(null, true);
    } else {
        req.isFileValid = false
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
}).single('foto'); //Añadido para probar función de middleware

const multerMiddleWare = (req, res, next) => {
    upload(req, res,
        (error) => {
            if (!error) return next();
            return send.response500(res);
        }
    );
};

router.put('/user/:id', multerMiddleWare, (req, res, next) => {
    if (!req.isFileValid) {
        return send.response500(res)
    }

    User.findById(req.params.id, (error, data) => {
        if(error){
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
})

module.exports = router;