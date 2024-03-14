/***********
Tabella External_Supervisor per le info dei supervisor esterni id, name surname, email, cod group
*************/

const db = require("../Database/DAO");

exports.getAllExternalCoSupervisor = async () => {
  const sql = 'SELECT * FROM External_Supervisor';
  const rows = await db.getData(sql, []);

  return rows;
};

// get all degrees
exports.getAllDegrees = async () => {
  const sql = 'SELECT * FROM Degree';
  const cdsList = await db.getData(sql, []);

  return cdsList;
};

// get all groups
exports.getAllGroups = async () => {
  const sql = 'SELECT * FROM ResearchGroup';
  const groupList = await db.getData(sql, []);

  return groupList;
};

// get all teacher
exports.getAllTeacher = async () => {
  const sql = `
  SELECT T.Id, T.Surname, T.Name, T.Email, T.Cod_Group, T.Cod_Department, G.Name AS GroupName 
  FROM Teacher AS T
  JOIN ResearchGroup AS G ON T.Cod_Group=G.Id
  `
  const teacherList = await db.getData(sql, []);

  return teacherList;
};

exports.getAllKeywords = () => {
  const sql = 'SELECT * FROM Keyword';
  const result = db.getData(sql, []);
  return result;
};

// better used with a transaction (Like while adding a proposal in proposalServices)
exports.addKeyword = async (keyword) => {
  let result;
  const sql = 'INSERT INTO Keyword (Name) VALUES (?);';
  await db.executeQuery(sql, [keyword]);
  result = await db.getOne('SELECT * FROM Keyword WHERE Id = (SELECT MAX(Id) FROM Keyword);', []);
  return result;
};

exports.addExternalCoSupervisor = async (data) => {
  let result;
  await db.executeTransaction(async () => {
    const sql = 'INSERT INTO External_Supervisor (Name, Surname, Email) VALUES (?,?,?);';
    await db.executeQuery(sql, [data.name, data.surname, data.email]);
    result = await db.getOne('SELECT * FROM External_Supervisor WHERE Id = (SELECT MAX(Id) FROM External_Supervisor);', []);
  });
  return result;
};

exports.getStudentExams = async (studentId) => {
  let result;
  result = await db.getData('SELECT * FROM Career WHERE Student_Id = ?;', [studentId]);
  return result;
};

exports.checkIfWeekRemaining = (date1, date2) => {
  const utcDate1 = new Date(date1);
  const utcDate2 = new Date(date2);
  const timeDifference = Math.abs(utcDate1 - utcDate2);
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference === 7;
};