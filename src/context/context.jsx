import { createContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { 
  getNotifications, 
  markAsRead as apiMarkAsRead,
} from "../api/notificationsApi";

export const User = createContext({});

export const UserProvider = ({ children }) => {
  // ... existing state ...
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    
    setIsLoading(true);
    try {
      const data = await getNotifications();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize socket connection
  useEffect(() => {

    const socket = io('http://localhost:5000', {
      withCredentials : true,
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('join', auth.user._id);
    });

    socket.on('new-notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, [ auth.user?._id]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!auth.token) return;
    
    try {
      await apiMarkAllAsRead();
      setUnreadCount(0);
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  }, []);

 

  

  // Initial fetch and periodic refresh
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return (
    <User.Provider
      value={{
        // ... existing values ...
        notifications,
        unreadCount,
        isLoading,
        fetchNotifications,
        markAsRead,
      }}
    >
      {children}
    </User.Provider>
  );
};