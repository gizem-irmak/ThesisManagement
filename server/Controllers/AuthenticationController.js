'use strict';


module.exports = {
    /** Get(/login) and Get(/login/callback) are in index.js due to some problem with routes */

    session: (req, res) => {
        if (req.isAuthenticated()) {
            if (req.user.role === 'Student') {
                res.status(200).json({
                    id: req.user.id,
                    email: req.user.email,
                    role: req.user.role,
                    name: req.user.name,
                    surname: req.user.surname,
                    gender: req.user.gender,
                    nationality: req.user.nationality,
                    cod_degree: req.user.cod_degree,
                    enrollment_year: req.user.enrollment_year,
                });
            } else {
                res.status(200).json({
                    id: req.user.id,
                    email: req.user.email,
                    role: req.user.role,
                    name: req.user.name,
                    surname: req.user.surname,
                    cod_group: req.user.cod_group,
                    cod_department: req.user.cod_department,
                });
            }
        } else {
            res.status(401).json({ errorMessage: 'Unauthorized' });
        }
    },
}