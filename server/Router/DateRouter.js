const express = require('express');
const dateRouter = express.Router();

const dateController = require('../Controllers/DateController');

dateRouter.get('/get', dateController.getDate);
dateRouter.post('/set', dateController.setDate);
dateRouter.post('/reset', dateController.resetDate);

module.exports = dateRouter;