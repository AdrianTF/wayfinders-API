const express = require('express')
const controller = require('./controller')
const uploader = require('../../middleware/uploader')

const router = express.Router()

router.put('/user/:id', uploader, controller.update)
router.post('/remove', controller.remove)     

module.exports = router;