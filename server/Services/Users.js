'use strict';

const db = require("../Database/DAO");

module.exports = {
    getStudentInfos: async function (id) {
        try {
            const sql = 'SELECT * FROM Student WHERE Id = ?';
            const row = await db.getOne(sql, [id]);
            if (row === undefined) return { status: 404, message: 'Student not found' };
            else {
                const studentInfos = {
                    id: row.Id,
                    surname: row.Surname,
                    name: row.Name,
                    gender: row.Gender,
                    nationality: row.Nationality,
                    email: row.Email,
                    cod_degree: row.Cod_Degree,
                    enrollment_year: row.Enrollment_Year,
                    role: 'Student'
                };

                return studentInfos;
            }
        } catch (e) {
            return { status: 500, message: 'Error during student info retrieving' };
        }
    },

    getTeacherInfos: async function (id) {
        try {

            const sql = 'SELECT * FROM Teacher WHERE Id = ?';
            const row = await db.getOne(sql, [id]);
            if (row === undefined) return { status: 404, message: 'Teacher not found' };
            else {
                const teacherInfos = {
                    id: row.Id,
                    surname: row.Surname,
                    name: row.Name,
                    email: row.Email,
                    cod_group: row.Cod_Group,
                    cod_department: row.Cod_Department,
                    role: 'Teacher'
                };

                return teacherInfos;
            }
        } catch (e) {
            return { status: 500, message: 'Error during teacher infos retrieving' };
        }
    },

    getSecretaryInfos: async function (id) {
        try {
            const sql = 'SELECT * FROM Secretary WHERE Id = ?';

            const row = await db.getOne(sql, [id]);

            if (row === undefined) return { status: 404, message: 'Secretary not found' };
            else {
                const secretaryInfos = {
                    id: row.Id,
                    surname: row.Surname,
                    name: row.Name,
                    email: row.Email,
                    role: 'Secretary'
                };

                return secretaryInfos;
            }
        } catch (e) {
            return { status: 500, message: 'Error during secretary infos retrieving' };
        }
    },

    getUserById: async function (id) {
        try {
            const sql = 'SELECT * FROM User WHERE Id = ?';
            const row = await db.getOne(sql, [id]);
            if (row === undefined) return { status: 404, message: 'User not found' };
            else {
                let userInfos;

                if (row.Role === 'Student')
                    userInfos = await this.getStudentInfos(row.Id);
                else if (row.Role === 'Teacher')
                    userInfos = await this.getTeacherInfos(row.Id);
                else if (row.Role === 'Secretary')
                    userInfos = await this.getSecretaryInfos(row.Id);

                return userInfos;
            }
        } catch (e) {
            return { status: 500, message: 'Error during user infos retrieving' };
        }
    }
};