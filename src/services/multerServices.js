const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/users/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/[:.]/g, '-') + file.originalname);
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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg' || file.mimetype === 'image/jpg') {
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