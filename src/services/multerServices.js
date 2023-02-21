const multer = require('multer');
const config = require('../config/config');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/users/');
    },
    filename: function (req, file, cb) {
        let extension = file.mimetype;
        extension = extension.substring(extension.indexOf("/")+1, extension.length);
        cb(null, req.params.id + '_' + new Date().toISOString().replace(/[:.]/g, '-') + `.${extension}`);
    }
});

const multiStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/posts/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/[:.]/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (config.UPLOADER_MIDDLEWARE_VALID_MIME.includes(file.mimetype)) {
        req.isFileValid = true
        cb(null, true);
    } else {
        req.isFileValid = false
        cb(null, false);
    }
};

module.exports = {
    single: multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 10
        },
        fileFilter: fileFilter
    }).single('foto'),

    multi: multer({
        storage: multiStorage,
        limits: {
            fileSize: 1024 * 1024 * 10
        },
        fileFilter: fileFilter
    }).array('fotos', 5)
}