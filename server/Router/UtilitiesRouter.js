const express = require('express');
const utilitiesController = require('../Controllers/UtilitiesController');

const utilitiesRouter = express.Router();

utilitiesRouter.get('/degrees', utilitiesController.getAllCds); 
utilitiesRouter.get('/groups', utilitiesController.getAllGroups); 
utilitiesRouter.get('/teachers', utilitiesController.getAllTeacher); 
utilitiesRouter.get('/external-cosupervisors', utilitiesController.getAllExternalCosupervisors); 
utilitiesRouter.post('/external-cosupervisors', utilitiesController.addExternalCoSupervisor); 
utilitiesRouter.get('/keywords', utilitiesController.getAllKeywords); 
utilitiesRouter.post('/keywords', utilitiesController.addKeyword); 
utilitiesRouter.get('/exams/:studentId', utilitiesController.getStudentExams); 

module.exports = utilitiesRouter;