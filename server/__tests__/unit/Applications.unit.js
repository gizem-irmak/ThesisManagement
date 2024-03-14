'use strict';

const applicationsServices = require('../../Services/Applications');
const applicationsController = require('../../Controllers/ApplicationsController');


jest.mock('../../Services/Applications');

describe('ApplicationsController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      isAuthenticated: jest.fn(),
      user: {
        id: '',
        studentId: ''
      },
      body: {} // additional setup for request body if needed
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('getAllApplications', () => {
    it('should return 200 and the list of applications when getAllApplications is successful', async () => {
      // Mock the implementation of getAllApplications to simulate a successful retrieval
      const fakeApplications = [
        { id: 1, name: 'Application1' },
        { id: 2, name: 'Application2' },
      ];
      applicationsServices.getAllApplications.mockResolvedValue(fakeApplications);

      // Call the method and pass in the mocked request and response objects
      await applicationsController.getAllApplications(req, res);

      // Verify that the status and JSON methods were called with the correct arguments
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeApplications);
    });

    it('should handle 500 Internal Server Error and return the appropriate response', async () => {
      // Mock the implementation of getAllApplications to simulate a 500 Internal Server Error
      applicationsServices.getAllApplications.mockRejectedValue({ status: 500, message: 'Internal Server Error' });

      // Call the method and pass in the mocked request and response objects
      await applicationsController.getAllApplications(req, res);

      // Verify that the status and JSON methods were called with the correct arguments for the error case
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });

    it('should handle 401 Internal Server Error and return the appropriate response', async () => {
      // Mock the implementation of getAllApplications to simulate a 401 Internal Server Error
      req.isAuthenticated.mockReturnValue(false);
      applicationsServices.getAllApplications.mockRejectedValue({ status: 401, message: 'user not authenticated' });
      // Call the method and pass in the mocked request and response objects
      await applicationsController.getAllApplications(req, res);
      // Verify that the status and JSON methods were called with the correct arguments for the error case
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'user not authenticated' });
    });

  });

  describe('getStudentApplications', () => {
    it('should return 200 and the list of student applications when getStudentApplications is successful', async () => {
      // Mock the user object
      req.isAuthenticated.mockReturnValue(true);
      req.user.id = 'someUserId';

      // Mock the implementation of getStudentApplications to simulate a successful retrieval
      const fakeApplications = [
        { id: 1, name: 'Application1' },
        { id: 2, name: 'Application2' },
      ];
      applicationsServices.getStudentApplications.mockResolvedValue(fakeApplications);

      // Call the method and pass in the mocked request and response objects
      await applicationsController.getStudentApplications(req, res);

      // Verify that the status and JSON methods were called with the correct arguments
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeApplications);
    });

    it('should handle 500 Internal Server Error and return the appropriate response', async () => {
      // Mock the user object
      req.isAuthenticated.mockReturnValue(true);
      req.user.id = 'someUserId';

      // Mock the implementation of getStudentApplications to simulate a 500 Internal Server Error
      applicationsServices.getStudentApplications.mockRejectedValue({ status: 500, message: 'Internal Server Error' });

      // Call the method and pass in the mocked request and response objects
      await applicationsController.getStudentApplications(req, res);

      // Verify that the status and JSON methods were called with the correct arguments for the error case
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });

    it('should handle 401 Internal Server Error and return the appropriate response', async () => {
      // Mock the implementation of getStudentApplications to simulate a 401 Internal Server Error
      req.isAuthenticated.mockReturnValue(false);
      applicationsServices.getStudentApplications.mockRejectedValue({ status: 401, message: 'user not authenticated' });
      // Call the method and pass in the mocked request and response objects
      await applicationsController.getStudentApplications(req, res);
      // Verify that the status and JSON methods were called with the correct arguments for the error case
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'user not authenticated' });
    });


  });

  describe('createApplication', () => {
    it('should create an application successfully and return 200', async () => {
      // Mock the implementation of createApplication to simulate a successful creation
      applicationsServices.createApplication.mockResolvedValue(true);

            // Set the proposalId in the request body
            req.body.proposalId = 'someProposalId';

      // Call the method and pass in the mocked request and response objects
      await applicationsController.createApplication(req, res);

      // Verify that the status and JSON methods were called with the correct arguments
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'application added' });
    });

    it('should handle 400 Bad Request when the student has a pending or accepted application', async () => {
      // Mock the implementation of createApplication to simulate a 400 Bad Request error
      applicationsServices.createApplication.mockResolvedValue(false);

      // Call the method and pass in the mocked request and response objects
      await applicationsController.createApplication(req, res);

      // Verify that the status and JSON methods were called with the correct arguments for the error case
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'The student has pending or accepted application' });
    });

    it('should handle 500 Internal Server Error and return the appropriate response', async () => {
        // Mock the implementation of createApplication to simulate a 500 Internal Server Error
        applicationsServices.createApplication.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
  
        // Set the proposalId in the request body
        req.body.proposalId = 'someProposalId';
  
        // Call the method and pass in the mocked request and response objects
        await applicationsController.createApplication(req, res);
  
        // Verify that the status and JSON methods were called with the correct arguments for the error case
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
      });
  });

  describe('acceptApplication', () => {
    it('should accept an application successfully and return 200', async () => {
      // Mock the implementation of acceptApplication to simulate a successful acceptance
      applicationsServices.acceptApplication.mockResolvedValue();

      // Call the method and pass in the mocked request and response objects
      await applicationsController.acceptApplication(req, res);

      // Verify that the status and JSON methods were called with the correct arguments
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'application accepted' });
    });

    it('should handle 500 Internal Server Error and return the appropriate response', async () => {
      // Mock the implementation of acceptApplication to simulate a 500 Internal Server Error
      applicationsServices.acceptApplication.mockRejectedValue({ status: 500, message: 'Internal Server Error' });

      // Call the method and pass in the mocked request and response objects
      await applicationsController.acceptApplication(req, res);

      // Verify that the status and JSON methods were called with the correct arguments for the error case
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ errorMessage: 'Internal Server Error' });
    });
  });

  describe('rejectApplication', () => {
    it('should reject an application successfully and return 200', async () => {
      // Mock the implementation of rejectApplication to simulate a successful rejection
      applicationsServices.rejectApplication.mockResolvedValue();

      // Call the method and pass in the mocked request and response objects
      await applicationsController.rejectApplication(req, res);

      // Verify that the status and JSON methods were called with the correct arguments
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'application rejected successfully!' });
    });

    it('should handle 500 Internal Server Error and return the appropriate response', async () => {
      // Mock the implementation of rejectApplication to simulate a 500 Internal Server Error
      applicationsServices.rejectApplication.mockRejectedValue({ status: 500, message: 'Internal Server Error' });

      // Call the method and pass in the mocked request and response objects
      await applicationsController.rejectApplication(req, res);

      // Verify that the status and JSON methods were called with the correct arguments for the error case
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ errorMessage: 'Internal Server Error' });
    });
  });
});
