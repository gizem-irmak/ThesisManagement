'use strict';
const db = require("../Database/DAO");
const ProposalsServices = require('./Proposals');
const NotificationsServices = require('./Notifications');

module.exports = {
    /* 
        I AM ONLY RETURNING BASIC INFOS.
        FOR MORE INFO ABOUT THE STUDENT/PROPOSAL THE USER WILL CLICK ANOTHER
        BUTTON TO SHOW MORE, AND IT WILL BE MADE ANOTHER REQUEST TO BRING PROPOSAL/STUDENT DATA
    */
    getAllApplications: async function () {
        const applications =
            await db.getData(`SELECT A.Application_Id, A.Student_Id, S.Surname|| " " || S.name AS StudentName,
                            A.Proposal_Id, P.Title, T.Surname|| " " || T.name AS Supervisor, A.date, A.Status, A.Cv
                            FROM Application AS A, Student AS S,  Proposal AS P, Teacher AS T
                            WHERE A.Student_Id = S.Id AND A.Proposal_Id = P.Id AND T.Id = P.Supervisor`, []);
        return this.attachProposals(applications);
    },

    getStudentApplications: async function (studentId) {
        const applications =
            await db.getData(`SELECT A.Application_Id, A.Student_Id, S.Surname|| " " || S.name AS StudentName,
                                A.Proposal_Id, P.Title, T.Surname || " " || T.name AS Supervisor, A.date, A.Status, A.Cv
                                FROM Application AS A, Student AS S,  Proposal AS P, Teacher AS T
                                WHERE A.Student_Id = S.Id AND A.Proposal_Id = P.Id AND T.Id = P.Supervisor
                                AND A.Student_Id = ?`, [studentId]);
        return this.attachProposals(applications);
    },

    getApplicationsByTeacherProposals: async function (teacherId) {
        const applications =
            await db.getData(`SELECT A.Application_Id, A.Student_Id, S.Surname|| " " || S.name AS StudentName,
                                A.Proposal_Id, P.Title, T.Surname || " " || T.name AS Supervisor, A.date, A.Status, A.Cv
                                FROM Application AS A, Student AS S,  Proposal AS P, Teacher AS T
                                WHERE A.Student_Id = S.Id AND A.Proposal_Id = P.Id AND T.Id = P.Supervisor
                                AND A.Proposal_Id IN (SELECT  Id FROM Proposal WHERE Supervisor = ?)`, [teacherId]);
        return this.attachProposals(applications);
    },

    attachProposals: async function (applications) {
        for (const a of applications) {
            a.Proposal = await ProposalsServices.getProposal(a.Proposal_Id);
        }
        return applications
    },

    //returns 1 if everything is okay, 0 if failed
    createApplication: async function (proposalId, studentId, cvFileName) {
        //CHECK IF THE STUDENT HAS OTHER APPLICATIONS NOT REJECTED
        const studentApplications = await this.getStudentApplications(studentId);
        for (const a of studentApplications) {
            if (a.Status === 'Pending' || a.Status === 'Accepted' || a.Proposal_Id === proposalId)
                return 0;
        }
        await db.executeTransaction(async () => {
            await db.executeQuery(`INSERT INTO Application (Proposal_Id, Student_Id, Status, Date, Cv)
                                       VALUES (?, ?, "Pending", CURRENT_TIMESTAMP, ?)`, [proposalId, studentId, cvFileName]);
            const proposalDetails = await ProposalsServices.getProposal(proposalId);
            await NotificationsServices.addNotification(proposalDetails.Supervisor.Id, 'New Application',
                `A new application was made on your proposal: ${proposalDetails.Title}.`);
        });
        return 1;
    },

    acceptApplication: async function (applicationId) {
        await db.executeTransaction(async () => {
            const applicationDetails =
                await db.getOne(`SELECT Proposal_Id, Student_Id FROM Application
                                 WHERE Application_Id = ?`, [applicationId]);
            const proposalDetails = await ProposalsServices.getProposal(applicationDetails.Proposal_Id);
            await db.executeQuery(`UPDATE Application
                                    SET Status = "Accepted"
                                    WHERE Application_Id = ?`, [applicationId]);
            // Set Other Applications of the same student as rejected (useless as the student should only have one pending/active application)
            await db.executeQuery(`UPDATE Application
                                    SET Status = "Rejected"
                                    WHERE Proposal_Id != ? AND Student_Id = ?`
                , [applicationDetails.Proposal_Id, applicationDetails.Student_Id]);
            // Cancel Applications of other students on the same proposal.
            await db.executeQuery(`UPDATE Application
                                    SET Status = "Canceled"
                                    WHERE Proposal_Id = ? AND Student_Id != ?`,
                [applicationDetails.Proposal_Id, applicationDetails.Student_Id]);
            const otherStudents =
                await db.getData(`SELECT Student_Id FROM Application WHERE Proposal_Id = ? AND Student_Id != ?`,
                    [applicationDetails.Proposal_Id, applicationDetails.Student_Id]);
            for (let s of otherStudents) {
                await NotificationsServices.addNotification(s.Student_Id, 'Application Canceled',
                    `Your application on ${proposalDetails.Title} was canceled.`);
            }

            await db.executeQuery(`UPDATE Proposal
                                    SET Archived = 1
                                    WHERE Id = ?;`, [applicationDetails.Proposal_Id]);
            await NotificationsServices.addNotification(applicationDetails.Student_Id, 'Application Accepted',
                `Your application on ${proposalDetails.Title} was accepted.`
            );
        });
    },

    rejectApplication: async function (applicationId) {
        await db.executeTransaction(async () => {
            await db.executeQuery(`UPDATE Application
                        SET Status = "Rejected"
                        WHERE Application_Id = ?`, [applicationId]);
            const applicationDetails =
                await db.getOne(`SELECT Proposal_Id, Student_Id FROM Application
                                         WHERE Application_Id = ?`, [applicationId]);
            const proposalDetails = await ProposalsServices.getProposal(applicationDetails.Proposal_Id);
            await NotificationsServices.addNotification(applicationDetails.Student_Id, 'Application Rejected',
                `Your application on ${proposalDetails.Title} was rejected.`
            );
        });
    }
}
