const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

module.exports = {
    insertProductCart:  async(req, res) => {
        const data = req.body;
        
        const userId = req.user.id;

        try {
            const productCart = new Cart({
                ...data,
                user: userId
            })

            const product = await Product.findById(data.product);
            product.countInStock = product.countInStock - data.quantity;
            product.save()
            productCart.save() 

            return res.status(200).json({
                status: 'success',
                productCart: productCart
            })
        } catch(e) {
            return res.status(404).json({
                status: "fail",
                message: "create product cart fail"
            })
        }
    },

    getUserCard: async (req, res) => {
        const userId = req.user.id;
        // console.log(userId)
        try {
            const products = await Cart.find({user: userId})
            return res.status(200).json({
                status: "success",
                products: products
            })
        } catch(e) {
            return res.status(404).json({
                status: "fail",
                message: "get product cart fail"
            })
        }
    },
    deleteProductCart: async(req, res) => {
        const id = req.params.id;

        try {
            const cart = await Cart.findById(id)
           
            const product = await Product.findById(cart.product);
          
            product.countInStock = product.countInStock + cart.quantity;
            const result = await Cart.deleteOne({_id: id})
            product.save()
            return res.status(200).json({
                status: "success",
                result: result
            })
        } catch(e) {
            return res.status(404).json({
                status: "fail",
                message: "delete product cart fail"
            })
        }
    },

    deleteAllUserCart: async (req, res) => {
        const userId = req.user.id;
        try {
            const result = await Cart.deleteMany({user: userId})
            return res.status(200).json({
                status: "success",
                result: result
            })
        } catch(e) {
            return res.status(404).json({
                status: "fail",
                message: "delete product cart fail"
            })
        }
    }
}