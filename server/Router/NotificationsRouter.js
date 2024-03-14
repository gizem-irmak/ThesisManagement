const express = require('express');
const notificationsController = require('../Controllers/NotificationsController');

const notificationsRouter = express.Router();

notificationsRouter.get('/get', notificationsController.getUserNotifications);
notificationsRouter.post('/read', notificationsController.setNotificationAsRead);
notificationsRouter.delete('/delete-one', notificationsController.removeNotification); 
notificationsRouter.delete('/delete-read', notificationsController.removeAllRead); 

module.exports = notificationsRouter;
