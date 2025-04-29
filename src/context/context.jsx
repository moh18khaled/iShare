import { createContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
import {
  getNotifications,
  markAsRead as apiMarkAsRead,
} from "../pages/PostsPage/NotificationsApi";

export const User = createContext({});

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [businessOwnerAuth, setBusinessOwnerAuth] = useState({});
  const [profilePicture, setProfilePicture] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Load state from cookies on initial render
  useEffect(() => {
    const storedAuth = Cookies.get("auth");
    const storedBusinessOwnerAuth = Cookies.get("businessOwnerAuth");
    const storedProfilePicture = Cookies.get("profilePicture");

    if (storedAuth) {
      try {
        const parsed = JSON.parse(decodeURIComponent(storedAuth));
        setAuth(parsed);
      } catch (e) {
        console.error("Error parsing auth cookie:", e);
      }
    }

    if (storedBusinessOwnerAuth) {
      try {
        setBusinessOwnerAuth(JSON.parse(storedBusinessOwnerAuth));
      } catch (e) {
        console.error("Error parsing business owner auth cookie:", e);
      }
    }

    if (storedProfilePicture) setProfilePicture(storedProfilePicture);
  }, []);

  // Save state to cookies when it changes
  useEffect(() => {
    if (Object.keys(auth).length > 0) {
      Cookies.set("auth", encodeURIComponent(JSON.stringify(auth)), { expires: 7 });
    }
  }, [auth]);

  useEffect(() => {
    if (Object.keys(businessOwnerAuth).length > 0) {
      Cookies.set("businessOwnerAuth", JSON.stringify(businessOwnerAuth), { expires: 7 });
    }
  }, [businessOwnerAuth]);

  useEffect(() => {
    if (profilePicture) {
      Cookies.set("profilePicture", profilePicture, { expires: 7 });
    }
  }, [profilePicture]);

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!auth?.userDetails?.id) return;

    setIsLoading(true);
    try {
      const data = await getNotifications(); // withCredentials is handled in the API file
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, [auth?.userDetails?.id]);

  // Socket.io connection for real-time notifications
  useEffect(() => {
    if (!auth?.userDetails?.id) return;

    console.log("Socket ID:", auth.userDetails.id);

    const socket = io(`${apiBaseUrl}`, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit("join", auth.userDetails.id);
    });

    socket.on("new-notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [auth?.userDetails?.id]);

  // Mark single notification as read
  const markAsRead = useCallback(async (notificationId) => {
    try {
      await apiMarkAsRead(notificationId); // withCredentials is handled in the API file
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, []);

  // Initial fetch and periodic refresh
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return (
    <User.Provider
      value={{
        auth,
        setAuth,
        businessOwnerAuth,
        setBusinessOwnerAuth,
        profilePicture,
        setProfilePicture,
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