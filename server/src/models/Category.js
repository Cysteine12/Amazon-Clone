const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    type: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Category', categorySchema)