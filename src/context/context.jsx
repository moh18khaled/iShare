import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie

export const User = createContext({});

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [businessOwnerAuth, setBusinessOwnerAuth] = useState({});
  const [profilePicture, setProfilePicture] = useState("");

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
    Cookies.set("auth", JSON.stringify(auth), { expires: 7 }); // Expires in 7 days
  }, [auth]);

  useEffect(() => {
    Cookies.set("businessOwnerAuth", JSON.stringify(businessOwnerAuth), { expires: 7 });
  }, [businessOwnerAuth]);

  useEffect(() => {
    Cookies.set("profilePicture", profilePicture, { expires: 7 });
  }, [profilePicture]);

  return (
    <User.Provider
      value={{ auth, setAuth, businessOwnerAuth, setBusinessOwnerAuth, profilePicture, setProfilePicture }}
    >
      {children}
    </User.Provider>
  );
};