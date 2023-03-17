
const router = require('express').Router();

const utils = require('../utils');
const orderController = require('../controllers/orderController');

router.route('/')
    .post(utils.isAuth,orderController.createOrders)
    .get(utils.isAuth, utils.isAdmin, orderController.getAllOrders)

router.get('/mine', utils.isAuth, orderController.getOrderByUser);
router.put('/:id', utils.isAuth, orderController.updateDelivered);
router.delete('/:id', utils.isAuth, utils.isAdmin, orderController.deleteOrder);


module.exports = router;