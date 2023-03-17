const mongoose = require('mongoose');

// const reviewSchema = mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },
//         comment: {
//             type: String,
//             required: true
//         },
//         rating: {
//             type: Number,
//             required: true
//         }
//     },{
//         timestamps: true
//     }
// );

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    // slug: {type: String},
    image: {type: String, require: true},
    branch: {type: String, require: true},
    // description: {type: String},
    price: {type: Number, required: true},
    countInStock: {type: Number, required: true},
    star: {type: Number, required: true, min: 1, max:5},
    size: {type: String, enum: ['X', 'S']}
}, {
    timestamps: true
});
productSchema.index({ name: 1, size: 1 }, { unique: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;