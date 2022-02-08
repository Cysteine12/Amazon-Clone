// -----------Back-end---------//
const express = require('express')
const router = express.Router()
const { ensureAdmin } = require('../middlewares/auth')


// -----------Controller---------//
const CategoryController = require('../controllers/categoryController')


// -----------Router---------//
router.get('/', CategoryController.index)

router.post('/', ensureAdmin, CategoryController.store)

router.get('/:id', ensureAdmin, CategoryController.show)

router.put('/:id', ensureAdmin, CategoryController.update)

router.delete('/:id', ensureAdmin, CategoryController.destroy)


module.exports = router