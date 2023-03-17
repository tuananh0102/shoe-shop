const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel')

module.exports = {
    createOrders: asyncHandler(
        async(req, res) => {
            const orders = req.body.orders;
            const userId = req.user.id

            const order = new Order({...orders, user: req.user.id});
            await Cart.deleteMany({user: userId})
            await order.save()
            return res.status(200).json({
                message: "create orders successfully"
            });
        }
    ),

    getAllOrders: asyncHandler(async(req, res) => {
        const orders = await Order.find().populate('user', 'name');
        return res.status(200).json({
            message: "get all success",
            order: orders
        })
    }),

    getOrderByUser: asyncHandler(async(req, res) => {
        const orders = await Order.find({user: req.user.id});
        return res.status(200).json({
            message: "get success",
            orders: orders
        })
    }),
    updateDelivered: asyncHandler(async(req, res) => {
        const order = await Order.findOne({_id: req.params.id, user: req.user.id});
        if(order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            await order.save();
            return res.status(200).json({
                message: "get success",
                orders: order
            })
        } else {
            return res.status(404).json({
                message: "order not found"
            })
        }
    }),
    deleteOrder: asyncHandler(async(req, res) => {
        await Order.deleteOne({_id: req.params.id});
        return res.status(200).json({
            message: "delete order success"
        });
    })
}