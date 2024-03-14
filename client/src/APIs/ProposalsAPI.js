const subParentURL = '/proposals';
import FetchAPIs from "./FetchAPIs";

const ProposalsAPI = {
  addOrUpdateProposal: async (proposal) => await FetchAPIs.post(subParentURL + '/edit', proposal),
  deleteProposal: async (proposalId) => await FetchAPIs.delete(subParentURL + '/delete', { proposalId: proposalId }),
  archiveProposal: async (proposalId) => await FetchAPIs.post(subParentURL + '/archive', { proposalId: proposalId }),
  getAllProposals: async () => await FetchAPIs.get(subParentURL + '/all'),
  getStudentApplicationsProposals: async () => await FetchAPIs.get(subParentURL + '/studentApplicationsProposals'),
  getAvailableProposalsForStudent: async () => await FetchAPIs.get(subParentURL + '/availableForStudent'),
  getActiveProposals: async () => await FetchAPIs.get(subParentURL + '/my-active'),
  getArchivedProposals: async () => await FetchAPIs.get(subParentURL + '/my-archived'),
  searchProposals: async (searchTerm) => await FetchAPIs.get(subParentURL + '/search/' + searchTerm),
};

export default ProposalsAPI;





