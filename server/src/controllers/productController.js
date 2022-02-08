const Product = require('../models/Product')

const index = async (req, res) => {
    try {
        const data = await Product.find().sort({ createdAt: -1 })
        
        res.status(200).json({ 
            success: true,
            data: data
        })
    } catch (err) {
        res.status(200).json({ err })
    }
}

const findByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params
        const data = await Product.find({ category: categoryId }).sort({ createdAt: -1 })

        res.status(200).json({ 
            success: true,
            data: data
        })
    } catch (err) {
        res.status(200).json({ err })
    }
}

const findByOwner = async (req, res) => {
    try {
        const { ownerId } = req.params
        const data = await Product.find({ owner: ownerId }).sort({ createdAt: -1 })

        res.status(200).json({ 
            success: true,
            data: data
        })
    } catch (err) {
        res.status(200).json({ err })
    }
}

const store = async (req, res) => {
    try {
        const product = new Product({
            category: req.body.categoryId,
            owner: req.body.ownerId,
            title: req.body.title,
            description: req.body.description,
            photo: req.file.location,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity
        })
        const data = await product.save()

        res.status(200).json({ 
            success: true,
            msg: 'Product posted successfully',
            data: data
        })
    } catch (err) {
        res.status(200).json({ err })
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Product.findById(id)

        res.status(200).json({ 
            success: true,
            data: data
        })
    } catch (err) {
        res.status(200).json({ err })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const product = {
            category: req.body.categoryId,
            owner: req.body.ownerId,
            title: req.body.title,
            description: req.body.description,
            photo: req.body.photo,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity
        }
        const data = await Product.updateOne({ _id: id}, product)

        res.status(200).json({ 
            success: true,
            data: data
        })
    } catch (err) {
        res.status(200).json({ err })
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await Product.findByIdAndDelete(id)

        res.status(200).json({ msg: 'Delete Successful!' })
    } catch (err) {
        res.status(200).json({ err })
    }
}


module.exports = {
    index,
    findByCategory,
    findByOwner,
    store,
    show,
    update,
    destroy
}