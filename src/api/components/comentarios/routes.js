const express = require('express')
const controller = require('./controller')
const validator = require('../../middleware/validator')

const router = express.Router()

router.get('/', controller.comments)
router.get('/:id', controller.comment)
router.post('/', [validator.comment()], controller.create)
router.delete('/:id', controller.remove)
router.put('/:id', controller.update)

module.exports = router;