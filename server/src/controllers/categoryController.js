const Category = require('../models/Category')

const index = async (req, res) => {
    try {
        const data = await Category.find().sort({ createdAt: -1 })

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
        const category = new Category({
            type: req.body.type
        })
        const data = await category.save()

        res.status(200).json({ 
            success: true,
            msg: 'Category uploaded successfully',
            data: data
        })
    } catch (err) {
        res.status(200).json({ err })
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Category.findOne({ _id: id })

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
        const category = {
            type: req.body.type
        }
        const data = await Category.updateOne({ _id: id}, category)

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
        await Category.findByIdAndDelete(id)

        res.status(200).json({ msg: 'Delete Successful!' })
    } catch (err) {
        res.status(200).json({ err })
    }
}


module.exports = {
    index,
    store,
    show,
    update,
    destroy
}
