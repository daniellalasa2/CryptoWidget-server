const express = require('express');
const checkAuth = require('../Middleware/checkAuth.middleware');
const ratesControllers = require('../Controllers/rates.controllers');
const router = express.Router();

router.get('/getrates', rates.Controllers.ratesRegister);
// router.post('/login', adminControllers.adminLogin);
// router.get('/me', checkAuth, adminControllers.getMe);

module.exports = router