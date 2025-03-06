import { createContext, useState } from "react";

export const User = createContext({});

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [businessOwnerAuth, setBusinessOwnerAuth] = useState({});
  const [profilePicture, setProfilePicture] = useState("");

  return (
    <User.Provider
      value={{ auth, setAuth, businessOwnerAuth, setBusinessOwnerAuth, profilePicture, setProfilePicture }}
    >
      {children}
    </User.Provider>
  );
};