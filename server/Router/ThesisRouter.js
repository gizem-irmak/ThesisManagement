const express = require('express');
const thesisController = require('../Controllers/ThesisController');

const thesisRouter = express.Router();

thesisRouter.get('/get/:thesisId', thesisController.getThesis);

//STUDENT ONLY ROUTES
thesisRouter.post('/edit', thesisController.addOrUpdateThesisRequest);
thesisRouter.delete('/delete/:thesisId', thesisController.deleteThesisRequest); 
thesisRouter.get('/current-student', thesisController.getThesisByStudent);

//TEACHER ONLY ROUTES
thesisRouter.get('/current-supervisor', thesisController.getThesisBySupervisor);
thesisRouter.get('/current-cosupervisor', thesisController.getThesisByCosupervisor);

//SECRETARY ONLY
thesisRouter.get('/all', thesisController.getTheses)

//TEACHER AND SECRETARY
thesisRouter.post('/set-status', thesisController.setThesisRequestStatus)

module.exports = thesisRouter;
