'use strict';
const notificationsServices = require('../../Services/Notifications');
const notificationsController = require('../../Controllers/NotificationsController');

jest.mock('../../Services/Notifications');

describe('NotificationsController', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        isAuthenticated: jest.fn(),
        body: { 
            notificationId : 1,
        },
        user:{
            id : 1,
        },
        
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    describe('setNotificationAsRead status 200', () => {
        it('should return 200 when status updated successfuly', async () => {
          
          notificationsServices.setNotificationAsRead.mockResolvedValue('status updated');
          // Call the method and pass in the mocked request and response objects
          await notificationsController.setNotificationAsRead(req, res);

          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith('status updated');
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of setNotificationAsRead to simulate a 500 Internal Server Error
          notificationsServices.setNotificationAsRead.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await notificationsController.setNotificationAsRead(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
      });


    describe('getUserNotifications', () => {
        it('should return 200 when getUserNotifications is done successfuly', async () => {
          notificationsServices.getUserNotifications.mockResolvedValue({});
          // Call the method and pass in the mocked request and response objects
          await notificationsController.getUserNotifications(req, res);

          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({});
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of setNotificationAsRead to simulate a 500 Internal Server Error
          notificationsServices.getUserNotifications.mockRejectedValue({ status: 500 });
    
          // Call the method and pass in the mocked request and response objects
          await notificationsController.getUserNotifications(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    describe('removeNotification', () => {
        it('should return 200 when removeNotification successfuly', async () => {
          
          notificationsServices.removeNotification.mockResolvedValue('deleted');
          // Call the method and pass in the mocked request and response objects
          await notificationsController.removeNotification(req, res);

          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith('deleted');
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of setNotificationAsRead to simulate a 500 Internal Server Error
          notificationsServices.removeNotification.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await notificationsController.removeNotification(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
      });

    describe('removeAllRead', () => {
    it('should return 200 when removeNotification successfuly', async () => {
        
        notificationsServices.removeAllRead.mockResolvedValue('deleted');
        // Call the method and pass in the mocked request and response objects
        await notificationsController.removeAllRead(req, res);

        // Verify that the status and JSON methods were called with the correct arguments
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('deleted');
    });

    it('should handle 500 Internal Server Error and return the appropriate response', async () => {
        // Mock the implementation of setNotificationAsRead to simulate a 500 Internal Server Error
        notificationsServices.removeAllRead.mockRejectedValue({ status: 500, message: 'Internal Server Error' });

        // Call the method and pass in the mocked request and response objects
        await notificationsController.removeAllRead(req, res);

        // Verify that the status and JSON methods were called with the correct arguments for the error case
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
    });
    
})