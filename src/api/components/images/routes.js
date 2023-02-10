const express = require('express')
const controller = require('./controller')
const uploader = require('../../middleware/uploader')

const router = express.Router()

router.put('/user/:id', uploader.single, controller.update)     
router.put('/posts/:id', uploader.multi, controller.multi)     


module.exports = router;