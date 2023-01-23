const express = require('express');
const { isLogin } = require('../middlewares/loginMiddleware');
const router = express.Router();
const userController = require('../controllers/usersController');
const { loggerMiddleware } = require('../middlewares/loggerMiddleware');

router.post('/usuarios', loggerMiddleware, userController.register);
router.get('/usuarios', [isLogin, loggerMiddleware], userController.list);

module.exports = router;
