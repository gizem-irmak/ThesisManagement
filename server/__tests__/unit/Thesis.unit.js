'use strict';

const thesisServices = require('../../Services/Thesis');
const thesisController = require('../../Controllers/ThesisController');

jest.mock('../../Services/Thesis');

describe('ThesisController', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        isAuthenticated: jest.fn(),

        body: {},

        params: {
            thesisId: 0

        },

        user: {
            id: 0,
        },
        
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });


    describe('addOrUpdateThesisRequest', () => {
        it('should return 200 and addOrUpdateThesisRequest is successful', async () => {
          // Mock the implementation of addOrUpdateThesisRequest to simulate a successful retrieval
          thesisServices.addOrUpdateThesisRequest.mockResolvedValue({});
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.addOrUpdateThesisRequest(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({});
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          thesisServices.addOrUpdateThesisRequest.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.addOrUpdateThesisRequest(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });  
    });  

    describe('deleteThesisRequest', () => {
        it('should return 200 and deleteThesisRequest is successful', async () => {
          // Mock the implementation of addOrUpdateThesisRequest to simulate a successful retrieval
          thesisServices.deleteThesisRequest.mockResolvedValue('deleted');
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.deleteThesisRequest(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith('deleted');
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          thesisServices.deleteThesisRequest.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.deleteThesisRequest(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });  
    });
    

    describe('setThesisRequestStatus', () => {
        it('should return 200 and setThesisRequestStatus is successful', async () => {
          // Mock the implementation of addOrUpdateThesisRequest to simulate a successful retrieval
          thesisServices.setThesisRequestStatus.mockResolvedValue('status updated');
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.setThesisRequestStatus(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith('status updated');
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          thesisServices.setThesisRequestStatus.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.setThesisRequestStatus(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });  
    });


    describe('getThesis', () => {
        it('should return 200 and getThesis is successful', async () => {
          // Mock the implementation of getThesis to simulate a successful retrieval
          thesisServices.getThesis.mockResolvedValue({});
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.getThesis(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({});
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          thesisServices.getThesis.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.getThesis(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });  
    }); 


    describe('getTheses', () => {
        it('should return 200 and getTheses is successful', async () => {
          // Mock the implementation of getTheses to simulate a successful retrieval
          thesisServices.getTheses.mockResolvedValue({});
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.getTheses(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({});
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          thesisServices.getTheses.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.getTheses(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });  
    });


    describe('getThesisByStudent', () => {
        it('should return 200 and getThesisByStudent is successful', async () => {
          // Mock the implementation of getThesisByStudent to simulate a successful retrieval
          thesisServices.getThesisByStudent.mockResolvedValue({});
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.getThesisByStudent(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({});
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          thesisServices.getThesisByStudent.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.getThesisByStudent(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });  
    });

    

    describe('getThesisBySupervisor', () => {
        it('should return 200 and getThesisBySupervisor is successful', async () => {
          // Mock the implementation of getThesisBySupervisor to simulate a successful retrieval
          thesisServices.getThesisBySupervisor.mockResolvedValue({});
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.getThesisBySupervisor(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({});
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          thesisServices.getThesisBySupervisor.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.getThesisBySupervisor(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });  
    });

    

    describe('getThesisByCosupervisor', () => {
        it('should return 200 and getThesisByCosupervisor is successful', async () => {
          // Mock the implementation of getThesisByCosupervisor to simulate a successful retrieval
          thesisServices.getThesisByCosupervisor.mockResolvedValue({});
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.getThesisByCosupervisor(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({});
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          thesisServices.getThesisByCosupervisor.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await thesisController.getThesisByCosupervisor(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });  
    });




});