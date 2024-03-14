const express = require('express');
const authRouter = express.Router();

const authController = require('../Controllers/AuthenticationController');

/** Get(/login) and Get(/login/callback) are in index.js due to some problem with routes */

authRouter.get('/session', authController.session);

module.exports = authRouter;