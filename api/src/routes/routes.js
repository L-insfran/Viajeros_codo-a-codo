const express = require('express')
const userController = require('../controllers/userControllers.js')
const router = express.Router()


router.get('/usuario', userController.index)
router.get('/usuario/:id_usuario', userController.show)
router.put('/usuario/:id_usuario', userController.update)
router.delete('/usuario/:id_usuario', userController.delete)
router.post('/register', userController.store)



module.exports = router