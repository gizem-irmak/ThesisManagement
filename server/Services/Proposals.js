'use strict';
const db = require("../Database/DAO");
const UtilitiesServices = require('./Utilities');
const UsersServices = require('./Users');
const NotificationsServices = require('./Notifications');
const CustomDate = require('./CustomDate');

module.exports = {
  addOrUpdateProposal: async function (data) {
    await db.executeTransaction(async () => {
      let proposalId;

      if (data.Id) {
        // there's an Id meaning we are updating
        proposalId = data.Id;

        await db.executeQuery(`
        UPDATE Proposal
        SET Title=?, Supervisor=?, Type=?, Description=?,
        Required_Knowledge=?, Notes=?, Expiration=?, Level=?
        WHERE Id=?`, [data.Title, data.Supervisor, data.Type, data.Description,
        data.Required_Knowledge, data.Notes, data.Expiration, data.Level, proposalId]);

        // deleting all related data and readding them
        await db.executeQuery('DELETE FROM Proposal_Internal_Cosupervisor WHERE Proposal_Id=?', [proposalId]);
        await db.executeQuery('DELETE FROM Proposal_External_Cosupervisor WHERE Proposal_Id=?', [proposalId]);
        await db.executeQuery('DELETE FROM Proposal_Degrees WHERE Proposal_Id=?', [proposalId]);
        await db.executeQuery('DELETE FROM Proposal_Groups WHERE Proposal_Id=?', [proposalId]);
        await db.executeQuery('DELETE FROM Proposal_Keywords WHERE Proposal_Id=?', [proposalId]);
      }
      else {
        // adding new
        await db.executeQuery(`
        INSERT INTO Proposal (Title, Supervisor, Type, Description,
          Required_Knowledge, Notes, Expiration, Level) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [data.Title, data.Supervisor, data.Type, data.Description,
        data.Required_Knowledge, data.Notes, data.Expiration, data.Level]);

        proposalId = (await db.getOne('SELECT MAX(Id) AS Id FROM Proposal', [])).Id;
      }

      if (data.cosupervisors && data.cosupervisors.length > 0) {
        for (const c of data.cosupervisors) {
          await db.executeQuery(
            `Insert Into Proposal_Internal_Cosupervisor (Proposal_Id, Co_Supervisor_Id)
             Values (?, ?)`, [proposalId, c.Id]);
        };
      }

      if (data.externalCosupervisors && data.externalCosupervisors.length > 0) {
        for (const c of data.externalCosupervisors) {
          await db.executeQuery(
            `Insert Into Proposal_External_Cosupervisor (Proposal_Id, Co_Supervisor_Id)
             Values (?, ?)`, [proposalId, c.Id]);
        };
      }

      if (data.degrees && data.degrees.length > 0) {
        for (const d of data.degrees) {
          await db.executeQuery(
            `Insert Into Proposal_Degrees (Proposal_Id, Degree_Id)
             Values (?, ?)`, [proposalId, d.Cod_Degree]);
        };
      }

      if (data.groups && data.groups.length > 0) {
        const uniqueGroupIds = [...new Set(data.groups.map(g => g.Id))];
        for (const g of uniqueGroupIds) {
          await db.executeQuery(
            `Insert Into Proposal_Groups (Proposal_Id, Group_Id)
             Values (?, ?)`, [proposalId, g]);
        };
      }

      if (data.keywords && data.keywords.length > 0) {
        for (let k of data.keywords) {
          if (!k.Id) {
            const newKeyword = await UtilitiesServices.addKeyword(k.Name);
            k = newKeyword;
          }
          await db.executeQuery(
            `Insert Into Proposal_Keywords (Proposal_Id, Keyword_Id)
             Values (?, ?)`, [proposalId, k.Id]);
        };
      }

    });
  },

  deleteProposal: async function (proposalId) {
    await db.executeTransaction(async () => {
      // deleting all related data
      await db.executeQuery('DELETE FROM Application WHERE Proposal_Id=?', [proposalId]);
      await db.executeQuery('DELETE FROM Proposal_Internal_Cosupervisor WHERE Proposal_Id=?', [proposalId]);
      await db.executeQuery('DELETE FROM Proposal_External_Cosupervisor WHERE Proposal_Id=?', [proposalId]);
      await db.executeQuery('DELETE FROM Proposal_Degrees WHERE Proposal_Id=?', [proposalId]);
      await db.executeQuery('DELETE FROM Proposal_Groups WHERE Proposal_Id=?', [proposalId]);
      await db.executeQuery('DELETE FROM Proposal_Keywords WHERE Proposal_Id=?', [proposalId]);
      await db.executeQuery('DELETE FROM Proposal WHERE Id=?', [proposalId]);
    });
  },

  archiveProposal: async function (proposalId) {
    await db.executeQuery('UPDATE Proposal SET Archived=1 WHERE Id=?', [proposalId]);
  },

  getAllProposals: async function () {
    let results = await db.getData(`SELECT * FROM Proposal`, []);
    return await this.getProposalsLinkedData(results);
  },

  getStudentApplicationsProposals: async function (studentId) {
    // get proposals data of the student's applications
    let results = await db.getData(
      `SELECT * FROM Proposal
       WHERE Id IN (SELECT Proposal_Id FROM Application WHERE Student_Id = ?)`, [studentId]);
    return await this.getProposalsLinkedData(results);
  },

  getAvailableProposalsForStudent: async function (studentId) {
    // get active proposals that suits the student degree
    const studentData = await UsersServices.getStudentInfos(studentId);
    let results = await db.getData(
      `SELECT * FROM Proposal
        WHERE Id IN (SELECT Proposal_Id FROM Proposal_Degrees WHERE Degree_Id = ?)
        AND Archived = 0 AND Expiration >= ?`, [studentData.cod_degree, CustomDate.date]);
    return await this.getProposalsLinkedData(results);
  },

  getProposal: async function (proposalId) {
    let result = await db.getOne(`SELECT * FROM Proposal
                                    WHERE Id = ?`, [proposalId]);
    return await this.getProposalLinkedData(result);
  },

  searchProposals: async function (searchTerm) {
    // THIS METHOD IS NO LONGER NEEEDED, LEFTOVER CODE, IN CASE NEEDED IN THE FUTURE
    let results = await db.getData(
      `SELECT *
      FROM Proposal
      WHERE Id IN (
        SELECT ProposalId
        FROM (
          SELECT
          P.Id AS ProposalId,
          P.Title || ' ' || P.Type || ' ' || P.Description || ' ' ||
          COALESCE(P.Required_Knowledge, '') || ' ' ||
          COALESCE(P.Notes, '') || ' ' || T1.Id || ' ' || T1.Surname || ' ' || T1.Name || ' ' || T1.Email
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT D.Title_Degree) , '')
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT RG.Name) , '')
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT T2.Surname), '')
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT T2.Name), '')
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT ES.Surname) , '')
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT ES.Name) , '')
          || ' ' || COALESCE(GROUP_CONCAT(DISTINCT K.Name), '') AS SearchableFormat
          FROM
          Proposal P
          JOIN Teacher T1 ON P.Supervisor = T1.Id
          LEFT JOIN Proposal_Degrees PD ON P.Id = PD.Proposal_Id
          LEFT JOIN Degree D ON PD.Degree_Id = D.Cod_Degree
          LEFT JOIN Proposal_Groups PG ON P.Id = PG.Proposal_Id
          LEFT JOIN ResearchGroup RG ON PG.Group_Id = RG.Id
          LEFT JOIN Proposal_Internal_Cosupervisor PIC ON P.Id = PIC.Proposal_Id
          LEFT JOIN Teacher T2 ON PIC.Co_Supervisor_Id = T2.Id
          LEFT JOIN Proposal_External_Cosupervisor PEC ON P.Id = PEC.Proposal_Id
          LEFT JOIN External_Supervisor ES ON PEC.Co_Supervisor_Id = ES.Id
          LEFT JOIN Proposal_Keywords PK ON P.Id = PK.Proposal_Id
          LEFT JOIN Keyword K ON PK.Keyword_Id = K.Id
          GROUP BY P.Id
          ) 
          WHERE SearchableFormat LIKE ?
          )`
      , [`%${searchTerm}%`]);
    return await this.getProposalsLinkedData(results);
  },

  getTeacherActiveProposals: async function (teacherId) {
    let results = await db.getData(`SELECT * FROM Proposal
                                    WHERE Archived == 0 AND Expiration >= ?
                                    AND Supervisor = ?`, [CustomDate.date, teacherId]);

    return await this.getProposalsLinkedData(results);
  },

  getTeacherArchivedProposals: async function (teacherId) {
    let results = await db.getData(`SELECT * FROM Proposal
                                    WHERE (Archived == 1 OR Expiration < ?)
                                    AND Supervisor = ?`, [CustomDate.date, teacherId]);

    return await this.getProposalsLinkedData(results);
  },

  //get data from the relation tables (Proposal_Degrees, Proposal_Innternal_Supervisor, ...)
  getProposalsLinkedData: async function (proposals) {
    for (const p of proposals) await this.getProposalLinkedData(p);
    return proposals;
  },

  getProposalLinkedData: async function (proposal) {
    proposal.Supervisor = (await db.getData(
      `SELECT Id, Surname, Name, Email, Cod_Group, Cod_Department
        FROM Teacher
        WHERE Id = ?`, [proposal.Supervisor]))[0];

    proposal.cosupervisors = await db.getData(
      `SELECT T.Id, T.Surname, T.Name, T.Email, T.Cod_Group, T.Cod_Department
        FROM Teacher AS T, Proposal_Internal_Cosupervisor AS C
        WHERE T.Id = C.Co_Supervisor_Id
        AND C.Proposal_Id = ?`, [proposal.Id]);

    proposal.externalCosupervisors = await db.getData(
      `SELECT T.Id, T.Surname, T.Name, T.Email
       FROM External_Supervisor AS T, Proposal_External_Cosupervisor AS C
       WHERE T.Id = C.Co_Supervisor_Id
       AND C.Proposal_Id = ?`, [proposal.Id]);

    proposal.degrees = await db.getData(
      `SELECT D.Cod_Degree, D.Title_Degree
       FROM Proposal_Degrees AS PD, Degree AS D
       WHERE PD.Degree_Id = D.Cod_Degree
       AND PD.Proposal_Id = ?`, [proposal.Id]);

    proposal.groups = await db.getData(
      `SELECT G.Id, G.Name, G.Cod_Department
       FROM Proposal_Groups AS PG, ResearchGroup AS G
       WHERE PG.Group_Id = G.Id
       AND PG.Proposal_Id = ?`, [proposal.Id]);

    proposal.keywords = await db.getData(
      `SELECT K.Id, K.Name
       FROM Proposal_Keywords AS PK, Keyword AS K
       WHERE PK.Keyword_Id = K.Id
       AND PK.Proposal_Id = ?`, [proposal.Id]);

    return proposal;
  },

  checkExpiringProposal: async function () {
    let allActiveProposals = await db.getData(`SELECT * FROM Proposal
    WHERE Archived == 0 AND Expiration >= ?`, [CustomDate.date]);
    for (const p of allActiveProposals) {
      if (UtilitiesServices.checkIfWeekRemaining(p.Expiration, CustomDate.date)) {
        await NotificationsServices.addNotification(p.Supervisor, 'Proposal Is About To Expire (Important)',
          `Your Proposal (${p.Title}) is going to expire next week (${p.Expiration}).`);
      }
    }
  },

};
