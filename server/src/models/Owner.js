const { Schema, model } = require('mongoose')

const ownerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = model('Owner', ownerSchema)