'use strict';

const proposalsServices = require('../../Services/Proposals');
const proposalsController = require('../../Controllers/ProposalsController');

jest.mock('../../Services/Proposals');

describe('ApplicationsController', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        isAuthenticated: jest.fn(),
        user: {
          id: '',
          studentId: ''
        },
        params:{
          searchTerm: ''
        },
        body: {
          proposalId: ''
        } // additional setup for request body if needed
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });


    describe('getAllProposals', () => {
        it('should return 200 and the list of proposals when getAllProposals is successful', async () => {
          // Mock the implementation of getAllApplications to simulate a successful retrieval
          const fakeProposal = [
            { id: 1, name: 'proposal1' },
            { id: 2, name: 'proposal2' },
          ];
          proposalsServices.getAllProposals.mockResolvedValue(fakeProposal);
    
          // Call the method and pass in the mocked request and response objects
          await proposalsController.getAllProposals(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeProposal);
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          proposalsServices.getAllProposals.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await proposalsController.getAllProposals(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
      });

      describe('getTeacherArchivedProposals', () => {
        it('should return 200 and the list of proposals when getTeacherArchivedProposals is successful', async () => {
          // Mock the implementation of getAllApplications to simulate a successful retrieval
          const fakeProposal = [
            { id: 1, name: 'teacher1' },
            { id: 2, name: 'teacher2' },
          ];
          proposalsServices.getTeacherArchivedProposals.mockResolvedValue(fakeProposal);
    
          // Call the method and pass in the mocked request and response objects
          await proposalsController.getTeacherArchivedProposals(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeProposal);
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          proposalsServices.getTeacherArchivedProposals.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await proposalsController.getTeacherArchivedProposals(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
        });

      });

      

      describe('getTeacherActiveProposals', () => {
        it('should return 200 and the list of proposals when getTeacherActiveProposals is successful', async () => {
          // Mock the implementation of getAllApplications to simulate a successful retrieval
          const fakeProposal = [
            { id: 1, name: 'teacher1' },
            { id: 2, name: 'teacher2' },
          ];
          proposalsServices.getTeacherActiveProposals.mockResolvedValue(fakeProposal);
    
          // Call the method and pass in the mocked request and response objects
          await proposalsController.getTeacherActiveProposals(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeProposal);
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of getAllProposals to simulate a 500 Internal Server Error
          proposalsServices.getTeacherActiveProposals.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await proposalsController.getTeacherActiveProposals(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
        });

      });

      
      

      describe('searchProposals', () => {
        it('should return 200 and the list of proposals when searchProposals is successful', async () => {
          // Mock the implementation of getAllApplications to simulate a successful retrieval
          const fakeProposal = [
            { id: 1, title: 'AI Research Project', supervisor: '12571', type:'research', description:'Exploring Artificial Intelligence', required_knowledge:'Deep Learning', notes:'Research experience', expiration:'2023-12-14', level:'Master', archived:'1'},
            { id: 2, title: 'AI Research Project', supervisor: '12271', type:'research', description:'Exploring Artificial Intelligence', required_knowledge:'Deep Learning', notes:'Research experience', expiration:'2023-12-14', level:'Master', archived:'0'},
          ];
          proposalsServices.searchProposals.mockResolvedValue(fakeProposal);
    
          // Call the method and pass in the mocked request and response objects
          await proposalsController.searchProposals(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeProposal);
        });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of searchProposals to simulate a 500 Internal Server Error
          proposalsServices.searchProposals.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await proposalsController.searchProposals(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
        });
      });

        


      describe('getAvailableProposalsForStudent', () => {
        it('should return 200 and the list of AvailableProposalsForStudent when is successful', async () => {
          // Mock the implementation of getAllApplications to simulate a successful retrieval
          const fakeProposal = [
            { id: 1, title: 'AI Research Project', supervisor: '12571', type:'research', description:'Exploring Artificial Intelligence', required_knowledge:'Deep Learning', notes:'Research experience', expiration:'2023-12-14', level:'Master', archived:'1'},
            { id: 2, title: 'AI Research Project', supervisor: '12271', type:'research', description:'Exploring Artificial Intelligence', required_knowledge:'Deep Learning', notes:'Research experience', expiration:'2023-12-14', level:'Master', archived:'0'},
          ];
          proposalsServices.getAvailableProposalsForStudent.mockResolvedValue(fakeProposal);
    
          // Call the method and pass in the mocked request and response objects
          await proposalsController.getAvailableProposalsForStudent(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(fakeProposal);
        });
      });

        it('should handle 500 Internal Server Error and return the appropriate response', async () => {
          // Mock the implementation of searchProposals to simulate a 500 Internal Server Error
          proposalsServices.getAvailableProposalsForStudent.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
    
          // Call the method and pass in the mocked request and response objects
          await proposalsController.getAvailableProposalsForStudent(req, res);
    
          // Verify that the status and JSON methods were called with the correct arguments for the error case
          expect(res.status).toHaveBeenCalledWith(500);
        });


        describe('getStudentApplicationsProposals', () => {
          it('should return 200 and the list of StudentApplicationsProposals when is successful', async () => {
            // Mock the implementation of getAllApplications to simulate a successful retrieval
            const fakeProposal = [
              { id: 1, title: 'AI Research Project', supervisor: '12571', type:'research', description:'Exploring Artificial Intelligence', required_knowledge:'Deep Learning', notes:'Research experience', expiration:'2023-12-14', level:'Master', archived:'1'},
              { id: 2, title: 'AI Research Project', supervisor: '12271', type:'research', description:'Exploring Artificial Intelligence', required_knowledge:'Deep Learning', notes:'Research experience', expiration:'2023-12-14', level:'Master', archived:'0'},
            ];
            proposalsServices.getAvailableProposalsForStudent.mockResolvedValue(fakeProposal);
      
            // Call the method and pass in the mocked request and response objects
            await proposalsController.getAvailableProposalsForStudent(req, res);
      
            // Verify that the status and JSON methods were called with the correct arguments
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(fakeProposal);
          });
        });
  
          it('should handle 500 Internal Server Error and return the appropriate response', async () => {
            // Mock the implementation of searchProposals to simulate a 500 Internal Server Error
            proposalsServices.getAvailableProposalsForStudent.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
      
            // Call the method and pass in the mocked request and response objects
            await proposalsController.getAvailableProposalsForStudent(req, res);
      
            // Verify that the status and JSON methods were called with the correct arguments for the error case
            expect(res.status).toHaveBeenCalledWith(500);
          });
          
          describe('archiveProposal', () => {
            it('should return 200 and proposal archived when is successful', async () => {
              // Mock the implementation of getAllApplications to simulate a successful retrieval
              const response = 'proposal archived';
              proposalsServices.archiveProposal.mockResolvedValue(response);
        
              // Call the method and pass in the mocked request and response objects
              await proposalsController.archiveProposal(req, res);
        
              // Verify that the status and JSON methods were called with the correct arguments
              expect(res.status).toHaveBeenCalledWith(200);
              expect(res.json).toHaveBeenCalledWith(response);
            });
          });
    
            it('should handle 500 Internal Server Error and return the appropriate response', async () => {
              // Mock the implementation of searchProposals to simulate a 500 Internal Server Error
              proposalsServices.archiveProposal.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
        
              // Call the method and pass in the mocked request and response objects
              await proposalsController.archiveProposal(req, res);
        
              // Verify that the status and JSON methods were called with the correct arguments for the error case
              expect(res.status).toHaveBeenCalledWith(500);
            });
            

          describe('deleteProposal', () => {
            it('should return 200 and proposal deleted  when is successful', async () => {
              // Mock the implementation of getAllApplications to simulate a successful retrieval
              const response = 'proposal deleted';
              proposalsServices.deleteProposal.mockResolvedValue(response);
        
              // Call the method and pass in the mocked request and response objects
              await proposalsController.deleteProposal(req, res);
        
              // Verify that the status and JSON methods were called with the correct arguments
              expect(res.status).toHaveBeenCalledWith(200);
              expect(res.json).toHaveBeenCalledWith(response);
            });
          });
    
            it('should handle 500 Internal Server Error and return the appropriate response', async () => {
              // Mock the implementation of searchProposals to simulate a 500 Internal Server Error
              proposalsServices.deleteProposal.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
        
              // Call the method and pass in the mocked request and response objects
              await proposalsController.deleteProposal(req, res);
        
              // Verify that the status and JSON methods were called with the correct arguments for the error case
              expect(res.status).toHaveBeenCalledWith(500);
            });


            describe('addOrUpdateProposal', () => {
              it('should return 200 and proposal deleted  when is successful', async () => {
                // Mock the implementation of getAllApplications to simulate a successful retrieval
                const response = [];
                proposalsServices.addOrUpdateProposal.mockResolvedValue([]);
          
                // Call the method and pass in the mocked request and response objects
                await proposalsController.addOrUpdateProposal(req, res);
          
                // Verify that the status and JSON methods were called with the correct arguments
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(response);
              });
            });
      
              it('should handle 500 Internal Server Error and return the appropriate response', async () => {
                // Mock the implementation of searchProposals to simulate a 500 Internal Server Error
                proposalsServices.addOrUpdateProposal.mockRejectedValue({ status: 500, message: 'Internal Server Error' });
          
                // Call the method and pass in the mocked request and response objects
                await proposalsController.addOrUpdateProposal(req, res);
          
                // Verify that the status and JSON methods were called with the correct arguments for the error case
                expect(res.status).toHaveBeenCalledWith(500);
              });

});