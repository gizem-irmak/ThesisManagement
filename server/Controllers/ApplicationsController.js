'use strict';

const applicationsServices = require('../Services/Applications');

module.exports = {

  getAllApplications: async function (req, res) {
    try {
      const applications = await applicationsServices.getAllApplications();
      return res.status(200).json(applications);
    } catch (err) {
      if (err.status === 401) {
        return res.status(err.status).json({ message: err.message });
      } else {
        return res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
      }
    }
  },

  getStudentApplications: async function (req, res) {
    try {
      const applications = await applicationsServices.getStudentApplications(req.user.id);
      return res.status(200).json(applications);
    } catch (err) {
      if (err.status === 401) {
        return res.status(err.status).json({ message: err.message });
      } else {
        return res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
      }
    }
  },

  getApplicationsByTeacherProposals: (req, res) => {
    applicationsServices.getApplicationsByTeacherProposals(req.user.id).then((applications) => {
      return res.status(200).json(applications);
    }).catch((err) => {
      return res.status(500).json({ message: err.message }).end()
    });
  },

  createApplication: async function (req, res) {
    try {
      const applicationAdded = await applicationsServices.createApplication(req.body.proposalId, req.user.id, req.file ? req.file.filename : 'NULL');
      if (!applicationAdded) {
        return res.status(400).json({ message: "The student has pending or accepted application" });
      }
      return res.status(200).json({ message: 'application added' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
  },

  acceptApplication: async function (req, res) {
    try {
      await applicationsServices.acceptApplication(req.body.applicationId);
      return res.status(200).json({ message: "application accepted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
  },

  rejectApplication: async function (req, res) {
    try {
      await applicationsServices.rejectApplication(req.body.applicationId);
      return res.status(200).json({ message: "application rejected successfully!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
  },
};
