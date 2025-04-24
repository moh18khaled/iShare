// src/api/notificationsApi.js
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const { notificationId } = req.params;
export const getNotifications = async () => {
  const response = await axios.get(`${apiBaseUrl}/user/notifications`, {withCredentials : true});
  return response.data.notifications;
};

export const markAsRead = async () => {
  await axios.patch(`${apiBaseUrl}/notifiactions/${notificationId}/read`, {}, {withCredentials:true});
};
