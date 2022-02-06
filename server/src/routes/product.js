// -----------Back-end---------//
const express = require('express')
const router = express.Router()

// -----------Middleware---------//
const upload = require('../middlewares/upload-product')

// -----------Controller---------//
const ProductController = require('../controllers/productController')


// -----------Router---------//

router.get('/', ProductController.index)

router.get('/category/:categoryId', ProductController.findByCategory)

router.post('/', upload.single('photo'), ProductController.store)

router.get('/:id', ProductController.show)

router.put('/:id', ProductController.update)

router.delete('/:id', ProductController.destroy)


module.exports = router