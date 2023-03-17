const router = require('express').Router();

const productController = require('../controllers/productController');
const utils = require('../utils');

router.route('/')
    .get(productController.getAllProducts)
    .post(utils.upload.single('product'),productController.insertProduct)
    .delete(productController.deleteMany)


router.route('/:id')
    .get(productController.getProductById)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router;