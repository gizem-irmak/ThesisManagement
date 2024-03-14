const CustomDate = require('../Services/CustomDate');

module.exports = {
    getDate: (req, res) => {
        try {
            return res.status(200).json({ date: CustomDate.date });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    },

    setDate: (req, res) => {
        try {
            CustomDate.date = req.body.newDate;
            return res.status(200).json({ message: 'date set' });
        } catch (error) {
            return res.status(500).json({ message: error.message || 'internal error' });
        }
    },

    resetDate: (req, res) => {
        try {
            CustomDate.resetDate();
            return res.status(200).json({ message: 'date reset' });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
} 