import { createContext, useContext, useState } from "react";

// Create the Context
export const UserDetails = createContext();

// Custom Hook to Use the Context
export function useUserDetails() {
  const userContext = useContext(UserDetails);
  if (!userContext) {
    throw new Error(
      "useUserDetails hook must be used within a UserDetailsContextProvider"
    );
  }
  return userContext;
}

// Function to Get Saved User Info from Local Storage
const savedUserInfo = () => {
  const data = localStorage.getItem("userDetails");
  return data ? JSON.parse(data) : null;
};

// Context Provider Component
const UserDetailsContextProvider = ({ children }) => {
  const [user, setUser] = useState(savedUserInfo());

  // Save User Info in State and Local Storage
  const saveUserInfo = (userDetails) => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    setUser(userDetails);
  };

  // Remove User Info from State and Local Storage
  const removeUserInfo = () => {
    localStorage.removeItem("userDetails"); // Remove only the specific key
    setUser(null);
  };

  // Context Value
  const value = { user, saveUserInfo, removeUserInfo };

  return <UserDetails.Provider value={value}>{children}</UserDetails.Provider>;
};

export default UserDetailsContextProvider;
