const utils = require('../utils');
const userController = require('../controllers/userController');

const router = require('express').Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

router.get('/current', utils.isAuth, userController.getCurrentUser);
router.get('/:id', utils.isAuth,userController.getUserById)
router.patch('/:id', userController.updateUser);
router.route('/')
    .get(userController.getAllUser)
    .delete(userController.deleteUser)

module.exports = router;
