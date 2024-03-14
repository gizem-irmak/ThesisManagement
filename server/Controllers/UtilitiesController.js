'use strict';

const utilitiesServices = require('../Services/Utilities');

module.exports = {
  getAllExternalCosupervisors: async function (req, res) {

    await utilitiesServices
      .getAllExternalCoSupervisor()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },

  getAllCds: async function (req, res) {


    await utilitiesServices
      .getAllDegrees()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },

  getAllGroups: async function (req, res) {


    await utilitiesServices
      .getAllGroups()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },

  getAllTeacher: async function (req, res) {


    await utilitiesServices
      .getAllTeacher()
      .then((result) => {

        return res.status(200).json(result);
      })
      .catch((err) => {

        return res.status(500).json({ message: err.message });
      });
  },

  getAllKeywords: async function (req, res) {


    await utilitiesServices
      .getAllKeywords()
      .then((result) => {

        return res.status(200).json(result);
      })
      .catch((err) => {

        return res.status(500).json({ message: err.message });
      });
  },

  addKeyword: async function (req, res) {


    await utilitiesServices
      .addKeyword(req.body.keyword)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {

        return res.status(500).json({ message: err.message });
      });
  },

  addExternalCoSupervisor: async function (req, res) {


    await utilitiesServices
      .addExternalCoSupervisor(req.body)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },

  getStudentExams: async function (req, res) {
    await utilitiesServices
      .getStudentExams(req.params.studentId)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
};
