const subParentURL = '/notifications';
import FetchAPIs from "./FetchAPIs";

const NotificationsAPI = {
    getMyNotifications: async () => await FetchAPIs.get(subParentURL + '/get'),
    setNotificationAsRead: async (notificationId) => await FetchAPIs.post(subParentURL + '/read',  { notificationId: notificationId }),
}

export default NotificationsAPI;