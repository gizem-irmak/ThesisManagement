'use strict';

const thesisServices = require('../Services/Thesis');

module.exports = {
    addOrUpdateThesisRequest: async function (req, res) {
        await thesisServices
            .addOrUpdateThesisRequest(req.body)
            .then((thesis) => {
                return res.status(200).json(thesis);
            })
            .catch((err) => {
                if (err.message === 'User Already Has a Thesis Request')
                    return res.status(400).json({ message: err });

                return res.status(500).json({ message: err.message });
            });
    },

    deleteThesisRequest: async function (req, res) {
        await thesisServices
            .deleteThesisRequest(req.params.thesisId)
            .then(() => {
                return res.status(200).json('deleted');
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },

    setThesisRequestStatus: async function (req, res) {
        console.log(req.body)

        await thesisServices
            .setThesisRequestStatus(req.body.thesisId, req.body.status, req.body.reason)
            .then(() => {
                return res.status(200).json('status updated');
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },

    getThesis: async function (req, res) {
        try {
            const results = await thesisServices.getThesis(req.params.thesisId);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getTheses: async function (req, res) {
        try {
            const results = await thesisServices.getTheses();
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getThesisByStudent: async function (req, res) {
        try {
            const results = await thesisServices.getThesisByStudent(req.user.id);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getThesisBySupervisor: async function (req, res) {
        try {
            const results = await thesisServices.getThesisBySupervisor(req.user.id);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getThesisByCosupervisor: async function (req, res) {
        try {
            const results = await thesisServices.getThesisByCosupervisor(req.user.id);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },


};
