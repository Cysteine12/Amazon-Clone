const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        min: 7,
        required: true,
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    }
}, {
    timestamps: true
})

module.exports = model('User', userSchema)