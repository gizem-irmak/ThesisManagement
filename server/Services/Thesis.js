'use strict';
const db = require("../Database/DAO");
const NotificationsServices = require('./Notifications');

/*
Thesis table fields
Id
Title
Student_Id
Supervisor_Id
Description
Status
Date
*/


module.exports = {
    addOrUpdateThesisRequest: async function (data) {
        await db.executeTransaction(async () => {
            let thesisId;
            if (data.Id) {
                // there's an Id meaning we are updating
                thesisId = data.Id;
                await this.logThesisRequestChange(data, await this.getThesis(thesisId));
                await db.executeQuery(`
          UPDATE Thesis
          SET Title=?, Description=?
          WHERE Id=?`, [data.Title, data.Description, thesisId]);

                // deleting all related data and readding them
                await db.executeQuery('DELETE FROM Thesis_Cosupervisors WHERE Thesis_Id=?', [thesisId]);
            }
            else {
                // check if the student has other requests
                const otherNonRejectedRequests =
                    await db.getData(`SELECT * FROM Thesis
                                    WHERE Student_Id=? AND Status != "Rejected"`, [data.Student_Id])
                if (otherNonRejectedRequests && otherNonRejectedRequests.length !== 0)
                    throw new Error('User Already Has a Thesis Request');
                // adding new
                await db.executeQuery(`
          INSERT INTO Thesis (Title, Student_Id, Supervisor_Id, Description, Status) 
          VALUES (?, ?, ?, ?, "Pending")`, [data.Title, data.Student_Id, data.Supervisor_Id, data.Description]);

                thesisId = (await db.getOne('SELECT MAX(Id) AS Id FROM Thesis', [])).Id;
            }

            if (data.cosupervisors && data.cosupervisors.length > 0) {
                for (const c of data.cosupervisors) {
                    await db.executeQuery(
                        `Insert Into Thesis_Cosupervisors (Thesis_Id, Cosupervisor_Id)
               Values (?, ?)`, [thesisId, c.Id]);
                };
            }
        });
    },

    setThesisRequestStatus: async function (thesisId, newStatus, reason) {
        await db.executeQuery('UPDATE Thesis SET Status=? WHERE Id=?', [newStatus, thesisId]);

        if (newStatus === "SecretaryAccepted") {
            const data = await db.getOne(`SELECT * FROM Thesis WHERE Id=?`, [thesisId]);
            await NotificationsServices.addNotification(data.Supervisor_Id, 'Thesis Request Accepted',
                `Your Thesis Request with the title: ${data.Title} was accepted by the Secretary.`);
        }
    },

    logThesisRequestChange: async function (newData, oldData) {
        if (!oldData) return;
        let changes = '';
        if (newData.Title !== oldData.Title)
            changes = `Title was changed from "${oldData.Title}" To "${newData.Title}".`;
        if (newData.Description !== oldData.Description)
            changes += `\nDescription was changed from "${oldData.Description}" To "${newData.Description}".`;
        newData.cosupervisors.forEach(c => {
            if (!oldData.cosupervisors.some((i) => i.Id === c.Id)) changes += `\nCosupervisor ${c.Name} ${c.Surname} was added.`
        });
        oldData.cosupervisors.forEach(c => {
            if (!newData.cosupervisors.some((i) => i.Id === c.Id)) changes += `\nCosupervisor ${c.Name} ${c.Surname} was removed.`
        });
        await db.executeQuery(`Insert Into Thesis_Change_History (Thesis_Id, Change) Values (?, ?)`, [newData.Id, changes]);
    },

    getThesesLinkedData: async function (theses) {
        for (const t of theses) await this.getThesisLinkedData(t);
        return theses;
    },

    getThesisLinkedData: async function (thesis) {
        thesis.Supervisor = (await db.getOne(
            `SELECT Id, Surname, Name, Email, Cod_Group, Cod_Department
              FROM Teacher
              WHERE Id = ?`, [thesis.Supervisor_Id]));
        thesis.student = (await db.getOne(
            `SELECT S.Surname, S.Name, S.Email, S.Cod_Degree, S.Enrollment_Year, D.Title_Degree
            FROM Student AS S, Degree AS D
            WHERE S.Cod_Degree = D.Cod_Degree AND S.Id = ?`, [thesis.Student_Id]));
        thesis.cosupervisors = await db.getData(
            `SELECT T.Id, T.Surname, T.Name, T.Email, T.Cod_Group, T.Cod_Department
            FROM Teacher AS T, Thesis_Cosupervisors AS C
            WHERE T.Id = C.Cosupervisor_Id
            AND C.Thesis_Id = ?`, [thesis.Id]);
        thesis.changesHistory = await db.getData(
            `SELECT Change, Date FROM Thesis_Change_History WHERE Thesis_Id = ?`, [thesis.Id]);
        return thesis;
    },

    getTheses: async function () {
        let results = await db.getData(`SELECT * FROM Thesis`, []);
        if (!results) throw new Error('Data Not Found');
        return await this.getThesesLinkedData(results);
    },

    getThesis: async function (id) {
        let results = await db.getOne(`SELECT * FROM Thesis WHERE Id=?`, [id]);
        if (!results) throw new Error('Data Not Found');
        return await this.getThesisLinkedData(results);
    },

    getThesisByStudent: async function (studentId) {
        let results = await db.getData(`SELECT * FROM Thesis WHERE Student_Id=?`, [studentId]);
        if (!results) throw new Error('Data Not Found');
        return await this.getThesesLinkedData(results);
    },

    getThesisBySupervisor: async function (supervisorId) {
        let results = await db.getData(`SELECT * FROM Thesis WHERE Supervisor_Id=? AND Status IN ('Accepted', 'ChangeRequested', 'SecretaryAccepted')`, [supervisorId]);
        if (!results) throw new Error('Data Not Found');
        return await this.getThesesLinkedData(results);
    },

    getThesisByCosupervisor: async function (cosupervisorId) {
        let results = await db.getData(`SELECT * FROM Thesis WHERE Id IN 
        (SELECT Thesis_Id FROM Thesis_Cosupervisors WHERE Cosupervisor_Id=?)`, [cosupervisorId]);
        if (!results) throw new Error('Data Not Found');
        return await this.getThesesLinkedData(results);
    },

    deleteThesisRequest: async function (thesisId) {
        await db.executeTransaction(async () => {
            await db.executeQuery('DELETE FROM Thesis_Change_History WHERE Thesis_Id=?', [thesisId]);
            await db.executeQuery('DELETE FROM Thesis_Cosupervisors WHERE Thesis_Id=?', [thesisId]);
            await db.executeQuery('DELETE FROM Thesis WHERE Id=?', [thesisId]);
        });
    },
};