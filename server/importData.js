const express = require('express');
const asyncHandler = require('express-async-handler');

const Product = require('./models/productModel');
const User = require('./models/userModel');

const products = require('./data/products');
const users = require('./data/users');

const router = express.Router();


router.route('/import/products')
    .post(asyncHandler(async (req, res) => {
        await Product.deleteMany();
        try {

            const newProducts =  await Product.insertMany(products)
            return res.status(200).json({
                status: "success",
                products: newProducts
            })
        } catch(e) {
            return res.status(400).json({
                status: 'fail',
                err: 'insert new data fail'
            })
        }
        //     , (err, results)=> {
        //     if(err) console.log(err);
        //     else {
        //         return res.status(200).json({
        //             stauts: "success",
        //             message: "delete all and import successfully",
        //             products: results
        //         })
        //     }
        // })

        

    }));

router.route('/import/users')
    .post(async (req, res) => {
        await User.deleteMany();
        try {

            const results = await User.insertMany(users)
            return res.status(200).json({
                stauts: "success",
                message: "delete all and import successfully",
                products: results
            })
        } catch(e) {
            return res.status(400).json({
                status: 'fail',
                err: 'insert new data fail'
            })
        }
    })

module.exports = router;