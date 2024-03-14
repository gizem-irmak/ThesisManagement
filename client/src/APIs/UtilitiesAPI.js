import FetchAPIs from "./FetchAPIs";
const subParentURL = '/utilities';

const UtilitesAPI = {
  getListCds: async () => await FetchAPIs.get(subParentURL + '/degrees'),
  getExternalCosupervisorList: async () => await FetchAPIs.get(subParentURL + '/external-cosupervisors'),
  addExternal: async (surname, name, email) => await FetchAPIs.post(subParentURL + '/archive', { Surname: surname, Name: name, Email: email }),
  getKeywordsList: async () => await FetchAPIs.get(subParentURL + '/keywords'),
  getAllGroups: async () => await FetchAPIs.get(subParentURL + '/groups'),
  getListTeacher: async () => await FetchAPIs.get(subParentURL + '/teachers'),
  getStudentExams: async (studentId) => await FetchAPIs.get(subParentURL + '/exams/' + studentId),
};

export default UtilitesAPI;