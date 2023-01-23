const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { loggerMiddleware } = require('../middlewares/loggerMiddleware');

router.post('/login', loggerMiddleware, loginController.login);

module.exports = router;
