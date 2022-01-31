// -----------Back-end---------//
const express = require('express')
const router = express.Router()

// -----------Middleware---------//
const upload = require('../middlewares/upload-product')

// -----------Controller---------//
const OwnerController = require('../controllers/ownerController')


// -----------Router---------//

router.get('/', OwnerController.index)

router.post('/', upload.single('photo'), OwnerController.store)

router.get('/:id', OwnerController.show)

router.put('/:id', OwnerController.update)

router.delete('/:id', OwnerController.destroy)


module.exports = router