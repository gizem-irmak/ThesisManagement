const express = require('express');
const apiRouter = express.Router();
const path = require('path');

apiRouter.use('/thesis', require('./ThesisRouter'));
apiRouter.use('/proposals', require('./ProposalsRouter'));
apiRouter.use('/applications', require('./ApplicationsRouter'));
apiRouter.use('/auth', require('./AuthRouter'));
apiRouter.use('/utilities', require('./UtilitiesRouter'));
apiRouter.use('/notifications', require('./NotificationsRouter'));
apiRouter.use('/date', require('./DateRouter'));
// To serve the cvs
apiRouter.get('/uploads/:filename', (req, res) => {
    const decodedFileName = decodeURIComponent(req.params.filename);
    res.sendFile(path.join(__dirname, '../uploads', decodedFileName));
});

// All the routes will be protected by the checkAuthentication middleware
const checkAuthentication = (req, res, next) => {
    // req.isAuthenticated() ? next() : res.status(401).json({ errorMessage: 'Unauthorized' });
}

apiRouter.use((req, res, next) => {
    checkAuthentication(req, res, next);
});

module.exports = apiRouter;