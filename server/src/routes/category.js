// -----------Back-end---------//
const express = require('express')
const router = express.Router()


// -----------Controller---------//
const CategoryController = require('../controllers/categoryController')


// -----------Router---------//

router.get('/', CategoryController.index)

router.post('/', CategoryController.store)

router.get('/:id', CategoryController.show)

router.put('/:id', CategoryController.update)

router.delete('/:id', CategoryController.destroy)


module.exports = router