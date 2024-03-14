const URL = 'http://localhost:3000/api';

export const Roles = {
    STUDENT: 'Student',
    TEACHER: 'Teacher',
    EXTERNAL: 'External'
};

export const Pages = {
    SEARCH_PROPOSALS: 'SearchProposals',
    BROWSE_APPLICATIONS: 'BrowseApplications',
    BROWSE_PROPOSALS: 'BrowseProposals',
    MY_PROPOSALS: 'MyProposals',
    STUDENT_APPLICATIONS: 'StudentApplications',
}

const Privileges = {
    [Roles.STUDENT]: Pages.STUDENT_APPLICATIONS,
    [Roles.TEACHER]: [Pages.MY_PROPOSALS, Pages.BROWSE_PROPOSALS, Pages.BROWSE_APPLICATIONS, Pages.SEARCH_PROPOSALS],
}

const AuthenticationAPI = {
    checkAuthenticationAPI: function (role, page) {
        if (Privileges[role].includes(page))
            return true;
        else
            return false;
    },

    getSessionAPI: function () {
        return fetch(URL + '/auth/session', {
            method: 'GET',
            credentials: "include"
        })
    },
}

export default AuthenticationAPI;