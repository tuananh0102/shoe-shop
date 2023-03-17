const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    quantity: {type:Number, required: true},
    image: {type:String, required: true},
    name: {type:String, required: true},
    size: {type:String, enum: ['X', 'S'], required: true},
    price: {type:Number, required: true},
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;