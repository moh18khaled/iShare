// src/api/notificationsApi.js
import axios from 'axios';
import { useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getNotifications = async () => {
  const response = await axios.get(`${apiBaseUrl}/user/notifications`, {
    withCredentials: true
  });
  console.log(response.data.notifications);
  return response.data.notifications;
};

export const markAsRead = async (notificationId) => {
  const response = await axios.patch(
    `${apiBaseUrl}/user/notifications/${notificationId}`, 
    {}, 
    { withCredentials: true }
  );
  console.log(response);
};
