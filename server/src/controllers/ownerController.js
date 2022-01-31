const Owner = require('../models/Owner')

const index = async (req, res) => {
    try {
        const data = await Owner.find().sort({ createdAt: -1 })

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
        const owner = new Owner({
            name: req.body.name,
            about: req.body.about,
            photo: req.file.location
        })
        const data = await owner.save()

        res.status(200).json({ 
            success: true,
            data: data
        })
    } catch (err) {
        res.status(200).json({ err })
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Owner.findOne({ _id: id })

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
        const owner = {
            name: req.body.name,
            about: req.body.about,
            photo: req.file.location
        }
        const data = await Owner.updateOne({ _id: id}, owner)

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
        await Owner.findByIdAndDelete(id)

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