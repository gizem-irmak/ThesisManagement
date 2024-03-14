const express = require('express');
const applicationsController = require('../Controllers/ApplicationsController');
const pdfUploadMiddleware = require('../Services/pdfUploadMiddleware');
const applicationsRouter = express.Router();

applicationsRouter.get('/all', applicationsController.getAllApplications);

//student only
applicationsRouter.get('/mine', applicationsController.getStudentApplications);
applicationsRouter.post('/apply', pdfUploadMiddleware, applicationsController.createApplication);

//teacher only routes
applicationsRouter.get('/for-my-proposals', applicationsController.getApplicationsByTeacherProposals);
applicationsRouter.post('/accept', applicationsController.acceptApplication);
applicationsRouter.post('/reject', applicationsController.rejectApplication);

module.exports = applicationsRouter;