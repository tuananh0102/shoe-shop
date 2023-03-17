const Product = require('../models/productModel');

module.exports = {

    getAllProducts: async(req, res) => {
        const queryObj = {...req.query}
        const queryArr = []
        if(!!queryObj.price && typeof queryObj.price.gte === 'object' && queryObj.price.gte.length > 1) {
            for(let i = 0; i < queryObj.price.gte.length; ++i) {
                queryArr.push({price: {gte: Number(queryObj.price.gte[i]), lte: queryObj.price.lte[i]}})
            }
            console.log(111)
            delete queryObj.price;
            queryObj['$or'] = queryArr
        }
        
        
        const excludeFiedls = ['sort', 'page', 'limit', 'fields']
        excludeFiedls.forEach(el => delete queryObj[el])
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        
        
        let query;
        try {
            if(req.query.name) {
                query = Product.find({name: {$regex: `^${req.query.name}`, $options: 'i'}})
            }
            else {
                query = Product.find(JSON.parse(queryStr));
            } 

            
           
            if(req.query.sort) {
                const sortBy = req.query.sort.split(',').join(' ')
              
                query = query.sort(sortBy)
            }

            const products = await query;

           
            return res.status(200).json({
                status: "success",
                products: products
            });


        } catch(e) {
           
            return res.status(404).json({
                status: "fail",
                message: e
            })
        }

    },

    getProductById: async (req, res) => {
        const id = req.params.id;
        let product;
        try{
            product = await Product.findById(id);
        }catch(e) {
            return res.status(404).json({
                status: "fail",
                message: e
            });
        }
        res.header("Access-Control-Allow-Origin", "*");
        return res.status(200).json({
            status: "success",
            product: product
        });
    },

    insertProduct: async (req, res) => {
        const data = req.body;
        try {
            const products =await Product.insertMany(data.products);
            return res.status(200).json({
                status: "success insert",
                products: products
            })
        } catch(e) {
            return res.status(404).json({
                status: "fail",
                message: e
            });
        }
    },

    updateProduct: async (req, res) => {
        const id = req.params.id;
        const newData = req.body.product;
        try {
            let updatedProduct = await Product.findById(id);
            for(let key in newData) {
                if(updatedProduct[key])
                    updatedProduct[key] = newData[key]
            }
            
            console.log(updatedProduct)
            await updatedProduct.save();
            return res.status(200).json({
                status: "success update",
                product: updatedProduct
            });
        } catch(e) {
            return res.status(404).json({
                status: "fail",
                message: e
            });
        }
    },
    deleteProduct: async (req, res) => {
        const id = req.params.id;
        try{
            await Product.deleteOne({id: id});
            return res.status(200).json({
                status: "success",
                message: "delete successfully"
            })
        } catch(e) {
            return res.status(404).json({
                status: "fail",
                message: e
            });
        }
    },

    deleteMany: async (req, res) => {
        const ids = req.body.deletedIds;
        if(!ids) 
            return res.status(400).json({
                message: "need to select id to delete"
            });
        try {
            const obj = await Product.deleteMany({_id: ids});
            return res.status(200).json({
                status: "success delete",
                message: `delete successfull ${obj.deletedCount} products with id: ${ids}`
            }) 
        } catch(e) {
            return res.status(404).json({
                status: "fail",
                message: e
            });
        }
    }

}