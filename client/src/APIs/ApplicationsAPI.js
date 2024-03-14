const subParentURL = '/applications';
import FetchAPIs from "./FetchAPIs";

const ApplicationsAPI = {
    getAllApplications: async () => await FetchAPIs.get(subParentURL + '/all'),
    acceptApplication: async (applicationId) => await FetchAPIs.post(subParentURL + '/accept', { applicationId: applicationId }),
    rejectApplication: async (applicationId) => await FetchAPIs.post(subParentURL + '/reject', { applicationId: applicationId }),
    getMyApplications: async () => await FetchAPIs.get(subParentURL + '/mine'),
    getApplicationsByTeacherProposals: async () => await FetchAPIs.get(subParentURL + '/for-my-proposals'),
    applyToProposal: async (formData) => await FetchAPIs.postCustomBody(subParentURL + '/apply', formData),
}

export default ApplicationsAPI;