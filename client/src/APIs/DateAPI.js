const subParentURL = '/date';
import FetchAPIs from "./FetchAPIs";

const DateAPI = {
    getDate: async () => await FetchAPIs.get(subParentURL + '/get'),
    setDate: async (newDate) => await FetchAPIs.post(subParentURL + '/set', { newDate: newDate }),
    resetDate: async () => await FetchAPIs.post(subParentURL + '/reset',  {}),
}

export default DateAPI;