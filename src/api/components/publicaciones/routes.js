const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get('/', controller.posts)
router.get('/:id', controller.post)
router.post('/', controller.create)
router.delete('/:id', controller.remove)
router.put('/:id', controller.update)

module.exports = router;