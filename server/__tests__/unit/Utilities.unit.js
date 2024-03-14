'use strict';
const utilitiesServices = require('../../Services/Utilities');
const utilitiesController = require('../../Controllers/UtilitiesController');
jest.mock('../../Services/Utilities');

describe('ApplicationsController', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        isAuthenticated: jest.fn(),
        body: {
          keyword: '',
          name: '',
          surname: '',
          email:''
        },
        params:{
          studentId : 0
        }
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    describe('getAllExternalCosupervisors', () => {
        it('should return 200 and the list of AllExternalCosupervisors when is successful', async () => {
          // Mock the implementation of getAllApplications to simulate a successful retrieval
          const fakeResponse = [
            { id: 1, surname: 'surname 1', name:'alex 1', email:'alex1@gmail.com' },
            { id: 2, surname: 'surname 2', name:'alex 2', email:'alex2@gmail.com' },
          ];
          utilitiesServices.getAllExternalCoSupervisor.mockResolvedValue(fakeResponse);
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.getAllExternalCosupervisors(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeResponse);
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          utilitiesServices.getAllExternalCoSupervisor.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.getAllExternalCosupervisors(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
      });

      describe('getAllCds', () => {
        it('should return 200 and the list of AllCds when is successful', async () => {
          // Mock the implementation of getAllApplications to simulate a successful retrieval
          const fakeResponse = [];
          utilitiesServices.getAllDegrees.mockResolvedValue(fakeResponse);
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.getAllCds(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeResponse);
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          utilitiesServices.getAllDegrees.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.getAllCds(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
      });
      

      describe('getAllGroups', () => {
        it('should return 200 and the list of AllGroups when is successful', async () => {
          // Mock the implementation of getAllApplications to simulate a successful retrieval
          const fakeResponse = [
            {id: 1, name:'Alex', cod_department: '1'},
            {id: 2, name:'Alex', cod_department: '2'},

          ];
          utilitiesServices.getAllGroups.mockResolvedValue(fakeResponse);
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.getAllGroups(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeResponse);
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          utilitiesServices.getAllGroups.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.getAllGroups(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
      });
      

      describe('getAllTeacher', () => {
        it('should return 200 and the list of AllTeacher when is successful', async () => {
          // Mock the implementation of getAllApplications to simulate a successful retrieval
          const fakeResponse = [
            {id: 1, surname: 'Alex', name: 'John', email:'alex@gmail.com', cod_group: 1, cod_department: 3 },
            {id: 2, surname: 'Alex', name: 'John', email:'alex@gmail.com', cod_group: 2, cod_department: 2 },
          ];
          utilitiesServices.getAllTeacher.mockResolvedValue(fakeResponse);
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.getAllTeacher(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeResponse);
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          utilitiesServices.getAllTeacher.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.getAllTeacher(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
      });

      describe('getAllKeywords', () => {
        it('should return 200 and the list of AllKeywords when is successful', async () => {
          // Mock the implementation of getAllApplications to simulate a successful retrieval
          const fakeResponse = [
            {id: 1, name: 'keyword1' },
            {id: 2, name: 'keyword1' },
          ];
          utilitiesServices.getAllKeywords.mockResolvedValue(fakeResponse);
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.getAllKeywords(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeResponse);
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          utilitiesServices.getAllKeywords.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.getAllKeywords(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
      });
      

      describe('addKeyword', () => {
        it('should return 200 and addKeyword when is successful', async () => {
          // Mock the implementation of getAllApplications to simulate a successful retrieval
          const fakeResponse = [];
          utilitiesServices.addKeyword.mockResolvedValue(fakeResponse);
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.addKeyword(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeResponse);
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          utilitiesServices.addKeyword.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.addKeyword(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
      });

      describe('addExternalCoSupervisor', () => {
        it('should return 200 and addExternalCoSupervisor when is successful', async () => {
          // Mock the implementation of getAllApplications to simulate a successful retrieval
          const fakeResponse = [];
          utilitiesServices.addExternalCoSupervisor.mockResolvedValue(fakeResponse);
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.addExternalCoSupervisor(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeResponse);
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          utilitiesServices.addExternalCoSupervisor.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.addExternalCoSupervisor(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
      });

      
    
      describe('getStudentExams', () => {
        it('should return 200 and getStudentExams when is successful', async () => {
          // Mock the implementation of getStudentExams to simulate a successful retrieval
          const fakeResponse = [];
          utilitiesServices.getStudentExams.mockResolvedValue(fakeResponse);
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.getStudentExams(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeResponse);
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          utilitiesServices.getStudentExams.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await utilitiesController.getStudentExams(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
      });

});