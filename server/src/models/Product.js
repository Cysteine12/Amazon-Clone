const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
    },
    rating: {
        type: [Number]
    }
}, {
    timestamps: true
})

module.exports = model('Product', productSchema)