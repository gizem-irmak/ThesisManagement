'use strict';

const proposalsServices = require('../Services/Proposals');

module.exports = {
  addOrUpdateProposal: async function (req, res) {
    await proposalsServices
      .addOrUpdateProposal(req.body)
      .then((proposal) => {
        return res.status(200).json(proposal);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },

  deleteProposal: async function (req, res) {
    await proposalsServices
      .deleteProposal(req.body.proposalId)
      .then(() => {
        return res.status(200).json('proposal deleted');
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },

  archiveProposal: async function (req, res) {
    await proposalsServices
      .archiveProposal(req.body.proposalId)
      .then(() => {
        return res.status(200).json('proposal archived');
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },

  getAllProposals: async function (req, res) {
    await proposalsServices.getAllProposals().then((proposals) => {
      return res.status(200).json(proposals);
    }).catch((err) => {
      return res.status(500).json({ message: err.message })
    });
  },

  getStudentApplicationsProposals: async function (req, res) {
    await proposalsServices.getStudentApplicationsProposals(req.user.id).then((proposals) => {
      return res.status(200).json(proposals);
    }).catch((err) => {
      return res.status(500).json({ message: err.message })
    });
  },

  getAvailableProposalsForStudent: async function (req, res) {
    await proposalsServices.getAvailableProposalsForStudent(req.user.id).then((proposals) => {
      return res.status(200).json(proposals);
    }).catch((err) => {
      return res.status(500).json({ message: err.message })
    });
  },

  searchProposals: async function (req, res) {
    await proposalsServices.searchProposals(req.params.searchTerm).then((proposals) => {
      return res.status(200).json(proposals);
    }).catch((err) => {
      return res.status(500).json({ message: err.message })
    });
  },

  getTeacherActiveProposals: async function (req, res) {
    try {
      const results = await proposalsServices.getTeacherActiveProposals(req.user.id);

      return res.status(200).json(results);
    } catch (error) {

      return res.status(500);
    }
  },

  getTeacherArchivedProposals: async function (req, res) {
    try {
      const results = await proposalsServices.getTeacherArchivedProposals(req.user.id);
      return res.status(200).json(results);
    } catch (error) {

      return res.status(500);
    }
  },
};
