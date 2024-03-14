const parentURL = 'http://localhost:3000/api';

const FetchAPIs = {
    get: async function (url) {
        const request = await fetch(parentURL + url, {
            method: 'GET',
            credentials: "include"
        });
        return request.status === 200 ? await request.json() : null;
    },

    delete: async function (url, body) {
        const request = await fetch(parentURL + url, {
            method: 'DELETE',
            credentials: "include",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return request;
    },

    post: async function (url, body) {
        const request = await fetch(parentURL + url, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return request;
    },

    postCustomBody:  async function (url, customBody) {
        const request = await fetch(parentURL + url, {
            method: 'POST',
            credentials: "include",
            body: customBody,
        });
        return request;
    },
}

export default FetchAPIs;