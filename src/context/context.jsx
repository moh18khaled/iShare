import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

export const User = createContext({});

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [businessOwnerAuth, setBusinessOwnerAuth] = useState({});
  const [profilePicture, setProfilePicture] = useState("");
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Initialize socket connection when auth changes
  useEffect(() => {
    if (auth?.token) {
      const newSocket = io('http://localhost:5000', { // Replace with your server URL
        auth: {
          token: auth.token
        },
        transports: ['websocket']
      });

      setSocket(newSocket);

      // Socket event listeners
      newSocket.on('connect', () => {
        console.log('Connected to socket server');
      });

      newSocket.on('new-notification', (notification) => {
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      return () => {
        newSocket.off('new-notification');
        newSocket.disconnect();
      };
    }
  }, [auth?.token]);

  // Join user's notification room when socket and auth are ready
  useEffect(() => {
    if (socket && auth?.user?._id) {
      socket.emit('join', auth.user._id);
    }
  }, [socket, auth?.user?._id]);

  // Mark notifications as read
  const markAsRead = () => {
    setUnreadCount(0);
  };

  // Load state from cookies on initial render
  useEffect(() => {
    const storedAuth = Cookies.get("auth");
    const storedBusinessOwnerAuth = Cookies.get("businessOwnerAuth");
    const storedProfilePicture = Cookies.get("profilePicture");

    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
    if (storedBusinessOwnerAuth) {
      setBusinessOwnerAuth(JSON.parse(storedBusinessOwnerAuth));
    }
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    }
  }, []);

  // Save state to cookies whenever it changes
  useEffect(() => {
    Cookies.set("auth", JSON.stringify(auth), { expires: 7 });
  }, [auth]);

  useEffect(() => {
    Cookies.set("businessOwnerAuth", JSON.stringify(businessOwnerAuth), { expires: 7 });
  }, [businessOwnerAuth]);

  useEffect(() => {
    Cookies.set("profilePicture", profilePicture, { expires: 7 });
  }, [profilePicture]);

  return (
    <User.Provider
      value={{
        auth,
        setAuth,
        businessOwnerAuth,
        setBusinessOwnerAuth,
        profilePicture,
        setProfilePicture,
        socket,
        notifications,
        unreadCount,
        markAsRead
      }}
    >
      {children}
    </User.Provider>
  );
};