import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get token, role, and userName from localStorage or set default values
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [role, setRole] = useState(localStorage.getItem("role") || "Default");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || null);

  // Sync context state with localStorage whenever token, role, or userName changes
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const decodedRole = decodedToken.authorities[0];
      const decodedUserName = decodedToken.userName;

      // Set context state
      setRole(decodedRole);
      setUserName(decodedUserName);

      // Store in localStorage
      localStorage.setItem("role", decodedRole);
      localStorage.setItem("userName", decodedUserName);
    }
  }, [token]); // Run when token changes

  const login = (newToken) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);  // Update context state

    // Decode the new token and set role and userName
    const decodedToken = jwtDecode(newToken);
    const decodedRole = decodedToken.authorities[0];
    const decodedUserName = decodedToken.userName;

    setRole(decodedRole);
    setUserName(decodedUserName);

    // Store role and userName in localStorage
    localStorage.setItem("role", decodedRole);
    localStorage.setItem("userName", decodedUserName);
  };

  const logout = () => {
    // Remove all relevant data from localStorage and reset context state
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    
    setRole(null);
    setUserName(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
