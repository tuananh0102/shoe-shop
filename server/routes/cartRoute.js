const router = require('express').Router();

const utils = require('../utils');
const cardController = require('../controllers/cartController');

router.route('/')
    .post(utils.isAuth,  cardController.insertProductCart)
    .get(utils.isAuth, cardController.getUserCard)
    .delete(utils.isAuth, cardController.deleteAllUserCart);

router.delete('/:id', utils.isAuth, cardController.deleteProductCart);

module.exports = router;