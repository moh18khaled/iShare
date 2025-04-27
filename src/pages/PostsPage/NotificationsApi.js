// src/api/notificationsApi.js
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getNotifications = async () => {
  const response = await axios.get(`${apiBaseUrl}/user/notifications`, {
    withCredentials: true
  });
  console.log(response.data.notifications);
  return response.data.notifications;
};

export const markAsRead = async (notificationId) => {
  await axios.patch(
    `${apiBaseUrl}/notifications/${notificationId}`, 
    {}, 
    { withCredentials: true }
  );
};
