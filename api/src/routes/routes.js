const express = require('express')
const userController = require('../controllers/userControllers.js')
const provinciaController = require('../controllers/provinciaControllers.js')
const categoriaController = require('../controllers/categoriaControllers.js')
const destinoController = require('../controllers/destinosControllers.js')
const destinoCategoriaController = require('../controllers/destino_categoriaControllers.js')
const router = express.Router()

//Rutas CRUD USUARIO
router.get('/usuarioList', userController.index)
router.get('/usuario/:id_usuario', userController.show)
router.put('/usuario/:id_usuario', userController.update)
router.delete('/usuario/:id_usuario', userController.delete)
router.post('/usuario', userController.store)

//Rutas CRUD Provincia
router.get('/provinciaList',provinciaController.index)
router.post('/provincia',provinciaController.store)
router.get('/provincia/:id_provincia',provinciaController.show)
router.put('/provincia/:id_provincia',provinciaController.update)
router.delete('/provincia/:id_provincia',provinciaController.delete)

//Rutas CRUD Categoria
router.get('/categoriaList',categoriaController.index)
router.post('/categoria',categoriaController.store)
router.get('/categoria/:id_categoria',categoriaController.show)
router.put('/categoria/:id_categoria',categoriaController.update)
router.delete('/categoria/:id_categoria',categoriaController.delete)

//Rutas CRUD Destinos
router.get('/destinoList',destinoController.index)
router.post('/destino',destinoController.store)
router.get('/destino/:id_destino',destinoController.show)
router.put('/destino/:id_destino',destinoController.update)
router.delete('/destino/:id_destino',destinoController.delete)

//Rutas CRUD Categoria_Destino
router.post('/categoria_destino',destinoCategoriaController.store)

module.exports = router